import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { User } from '../../models/user.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { PharmacyAdministratorService } from '../../services/users/pharmacy-administrator.service';
import { SysAdminPharmaciesModalDialogComponent } from './pharmacies-modal-dialog/pharmacies-modal-dialog.component';

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
  public pharmacy: Pharmacy;
  public pharmacyName: string;

  constructor(private pharmacyAdministatorService : PharmacyAdministratorService, private pharmacyService : PharmacyService,
                private snackBar : MatSnackBar, private dialog : MatDialog) { }

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
      this.street, this.email, this.phoneNumber, this.password), this.pharmacy.id).subscribe(user => {
        this.snackBar.open('Administrator apoteke je uspešno registrovan!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      })
  }

  selectPharmacyClick() : void {
    const dialogRef = this.dialog.open(SysAdminPharmaciesModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
      {
        this.pharmacy = result.pharmacy;
        this.pharmacyName = this.pharmacy.name;
      }
    });
  }

  checkPasswordMatch() : boolean {
    return this.password === this.repeatPassword;
  }

}
