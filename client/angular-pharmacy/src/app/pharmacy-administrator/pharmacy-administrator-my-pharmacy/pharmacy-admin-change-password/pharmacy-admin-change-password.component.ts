import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pharmacy } from '../../../models/pharmacy.model';
import { User } from '../../../models/user.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { DermatologistService } from '../../../services/users/dermatologist.service';
import { PharmacyAdministratorService } from '../../../services/users/pharmacy-administrator.service';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-pharmacy-admin-change-password',
  templateUrl: './pharmacy-admin-change-password.component.html',
  styleUrls: ['./pharmacy-admin-change-password.component.scss']
})

export class PharmacyAdminChangePasswordComponent implements OnInit {

  public password: string = '';
  public repeatPassword: string = '';
  public loggedPharmacyAdmin: User;
  public pharmacy: Pharmacy;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private authService : AuthenticationService, private userService: UserService, private pharmacyAdministratorService: PharmacyAdministratorService, private pharmacyService: PharmacyService,
              private router : Router, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<PharmacyAdminChangePasswordComponent>) {
                this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
                  data => {
                    this.pharmacy = data;
                  }
                );
               }

    saveClick(): void {
      if (this.checkInputData()) {
        this.resetUserPassword();
      }
    }

  ngOnInit(): void {
  }

  resetUserPassword(): void {
    if(this.password == '' || this.repeatPassword == '') {
      this.openSnackBar('Morate izmeniti lozinku pri prvoj prijavi na vaš nalog!', 'Zatvori');
      return;
    }
    this.userService.getUserById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.loggedPharmacyAdmin = data;
        this.pharmacyAdministratorService.updatePharmacyAdministrator(this.loggedPharmacyAdmin.id, new User(this.loggedPharmacyAdmin.id, this.loggedPharmacyAdmin.firstName, this.loggedPharmacyAdmin.lastName, this.loggedPharmacyAdmin.city, this.loggedPharmacyAdmin.country, this.loggedPharmacyAdmin.street, this.loggedPharmacyAdmin.email, this.loggedPharmacyAdmin.phoneNumber, encodeURIComponent(this.password)), this.pharmacy.id).subscribe(
          data => {
            this.loggedPharmacyAdmin = data;
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
