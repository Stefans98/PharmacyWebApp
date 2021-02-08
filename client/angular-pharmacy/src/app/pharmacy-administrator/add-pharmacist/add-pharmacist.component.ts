import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { User } from '../../models/user.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';

@Component({
  selector: 'app-add-pharmacist',
  templateUrl: './add-pharmacist.component.html',
  styleUrls: ['./add-pharmacist.component.scss']
})
export class AddPharmacistComponent implements OnInit {

  public id : number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public password: string;
  public repeatPassword: string;
  public city: string;
  public street: string;
  public country: string;

  public pharmacy: Pharmacy;

  constructor(private pharmacistService: PharmacistService, private snackBar: MatSnackBar, private pharmacyService: PharmacyService, 
              private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  registrationClick() : void {
    if (!this.checkPasswordMatch()) {
      this.snackBar.open('Lozinke se moraju poklapati!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
       return;
    }
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.pharmacistService.registerPharmacist(new User(0, this.firstName, this.lastName, this.city, this.country,
          this.street, this.email, this.phoneNumber, this.password), this.pharmacy.id).subscribe(user => {
            this.snackBar.open('Farmaceut je uspešno registrovan!', null, { 
              duration : 3000, 
              verticalPosition: 'top'
            });
        });
      }
    );
  }

  checkPasswordMatch() : boolean {
    return this.password === this.repeatPassword;
  }

}
