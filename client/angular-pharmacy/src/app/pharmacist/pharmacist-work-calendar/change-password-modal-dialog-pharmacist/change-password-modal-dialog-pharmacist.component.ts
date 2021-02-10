import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pharmacist } from '../../../models/pharmacist.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { PharmacistService } from '../../../services/users/pharmacist.service';

@Component({
  selector: 'app-change-password-modal-dialog-pharmacist',
  templateUrl: './change-password-modal-dialog-pharmacist.component.html',
  styleUrls: ['./change-password-modal-dialog-pharmacist.component.scss']
})
export class ChangePasswordModalDialogPharmacistComponent implements OnInit {

  public password: string = '';
  public repeatPassword: string = '';
  public loggedPharmacist: Pharmacist;

  constructor(private pharmacistService : PharmacistService, private authService : AuthenticationService,
    private router : Router, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ChangePasswordModalDialogPharmacistComponent>) { }

  ngOnInit(): void {
  }

  saveClick(): void {
    if (this.checkInputData()) {
      this.resetUserPassword();
    }
  }

  resetUserPassword(): void {
    if(this.password == '' || this.repeatPassword == '') {
      this.openSnackBar('Morate izmeniti lozinku pri prvoj prijavi na vaš nalog!', 'Zatvori');
      return;
    }
    this.pharmacistService.getPharmacistById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.loggedPharmacist = data;
        this.pharmacistService.updatePharmacist(this.loggedPharmacist.id, new Pharmacist(this.loggedPharmacist.id,  this.loggedPharmacist.firstName, this.loggedPharmacist.lastName, this.loggedPharmacist.city, this.loggedPharmacist.country,  this.loggedPharmacist.street, this.loggedPharmacist.email, this.loggedPharmacist.phoneNumber, encodeURIComponent(this.password), 0)).subscribe(
          data => {
            this.loggedPharmacist = data;
            this.password = '';
            this.repeatPassword = '';
            this.openSnackBar('Uspešno ste izmenili lozinku, možete se prijaviti na vaš nalog!', 'Zatvori');
            this.dialogRef.close();
            this.authService.logout();
            this.router.navigate(['login']);
          },
          error => {
            if (error.status = 500){
            }
          });
      },
      error => {
        if (error.status == 404){ 
        }
      }
    ); 
    
  }

  checkInputData() : boolean {
    if (this.isPasswordValid()) {
      return true;
    }
    return false;
  }

  isPasswordValid() : boolean {
    if (this.password === this.repeatPassword) {
      return true;
    }
    this.openSnackBar('Nova loznika i lozinka za potvrdu moraju biti iste!', 'Zatvori');
    return false;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
