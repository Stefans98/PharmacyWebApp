import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Dermatologist } from '../../../models/dermatologist.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { DermatologistService } from '../../../services/users/dermatologist.service';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-change-password-modal-dialog',
  templateUrl: './change-password-modal-dialog.component.html',
  styleUrls: ['./change-password-modal-dialog.component.scss']
})
export class ChangePasswordModalDialogComponent implements OnInit {

  public password: string = '';
  public repeatPassword: string = '';
  public loggedDermatologist: Dermatologist;

  constructor(private dermatologistService : DermatologistService, private authService : AuthenticationService,
    private router : Router, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<ChangePasswordModalDialogComponent>) { }

  ngOnInit(): void {
  }

  saveClick(): void {
    if (this.checkInputData()) {
      this.resetUserPassword();
    }
  }

  resetUserPassword(): void {
    if(this.password == '' || this.repeatPassword == '') {
      this.openSnackBar('Morate izmeniti lozinku pri prvom logovanju!', 'Zatvori');
      return;
    }
    this.dermatologistService.getDermatologistById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.loggedDermatologist = data;
        this.dermatologistService.updateDermatologist(this.loggedDermatologist.id, new Dermatologist(this.loggedDermatologist.id,  this.loggedDermatologist.firstName, this.loggedDermatologist.lastName, this.loggedDermatologist.city, this.loggedDermatologist.country,  this.loggedDermatologist.street, this.loggedDermatologist.email, this.loggedDermatologist.phoneNumber, encodeURIComponent(this.password), 0)).subscribe(
          data => {
            this.loggedDermatologist = data;
            this.password = '';
            this.repeatPassword = '';
            this.openSnackBar('Uspešno ste izmenili lozinku!', 'Zatvori');
            this.dialogRef.close();
            if (this.password.length > 0) {
              this.authService.logout();
              this.router.navigate(['login']);
            }
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
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
