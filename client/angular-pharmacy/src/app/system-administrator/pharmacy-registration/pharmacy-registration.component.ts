import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { ResetPassword } from '../../models/reset-password.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { UserService } from '../../services/users/user.service';
import { SysAdmChangePasswordModalDialogComponent } from './sys-adm-change-password-modal-dialog/sys-adm-change-password-modal-dialog.component';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.scss']
})
export class PharmacyRegistrationComponent implements OnInit {

  public id : number;
  public name: string;
  public city: string;
  public street: string;
  public country: string;
  public description: string;
  public latitude: number;
  public longitude: number;
  public resetPasswordData : ResetPassword;

  constructor(private pharmacyService : PharmacyService, private snackBar : MatSnackBar, private userService : UserService,
    private authService : AuthenticationService, private dialog : MatDialog) {
    this.userService.getPasswordResetDataForUser(this.authService.getLoggedUserId()).subscribe(data => {
      this.resetPasswordData = data;
      if(this.resetPasswordData.passwordReset == false) { // First login
        let dialogRef = this.dialog.open(SysAdmChangePasswordModalDialogComponent,{
          panelClass: 'my-centered-dialog',
          width: '550px',
          height: '365px',
          disableClose: true
        });
      }
    })
   }

  ngOnInit(): void {
  }

  registrationClick() : void {
    this.pharmacyService.registerPharmacy(new Pharmacy(0, this.name, this.city, this.country,
      this.street, this.description, 0, null, 0.0), this.latitude, this.longitude).subscribe(user => {
        this.snackBar.open('Apoteka je uspešno registrovana!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      })
  }

  checkIfFieldsAreEmpty() : boolean {
    return !this.name || !this.city || !this.country || !this.street || !this.latitude || !this.longitude;
  }

}
