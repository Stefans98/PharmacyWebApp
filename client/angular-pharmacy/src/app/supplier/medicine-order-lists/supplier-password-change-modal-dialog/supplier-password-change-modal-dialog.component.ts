import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { SupplierService } from '../../../services/users/supplier.service';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-supplier-password-change-modal-dialog',
  templateUrl: './supplier-password-change-modal-dialog.component.html',
  styleUrls: ['./supplier-password-change-modal-dialog.component.scss']
})
export class SupplierPasswordChangeModalDialogComponent implements OnInit {

  public password: string = '';
  public repeatPassword: string = '';
  public loggedUser : User;

  constructor(private supplierService : SupplierService, private userService : UserService, private authService : AuthenticationService,
    private router : Router, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<SupplierPasswordChangeModalDialogComponent>) { }

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
    this.userService.getUserById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.loggedUser = data;
        this.supplierService.updateSupplier(new User(this.loggedUser.id, this.loggedUser.firstName, this.loggedUser.lastName,
          this.loggedUser.city, this.loggedUser.country, this.loggedUser.street, this.loggedUser.email,
          this.loggedUser.phoneNumber, this.password)).subscribe(
          data => {
            this.loggedUser = data;
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
