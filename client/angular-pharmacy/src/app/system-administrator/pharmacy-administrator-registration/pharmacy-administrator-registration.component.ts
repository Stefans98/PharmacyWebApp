import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { PharmacyAdministratorService } from '../../services/users/pharmacy-administrator.service';

@Component({
  selector: 'app-pharmacy-administrator-registration',
  templateUrl: './pharmacy-administrator-registration.component.html',
  styleUrls: ['./pharmacy-administrator-registration.component.scss']
})
export class PharmacyAdministratorRegistrationComponent implements OnInit {

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

  constructor(private pharmacyAdministatorService : PharmacyAdministratorService, private snackBar : MatSnackBar) { }

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
    this.pharmacyAdministatorService.registerPharmacyAdministrator(new User(0, this.firstName, this.lastName, this.city, this.country,
      this.street, this.email, this.phoneNumber, this.password)).subscribe(user => {
        this.snackBar.open('Dermatolog je uspešno registrovan!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      })
  }

  checkPasswordMatch() : boolean {
    return this.password === this.repeatPassword;
  }

}
