import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pharmacist } from '../../models/pharmacist.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';
import { PharmacyModalDialogComponent } from './pharmacy-modal-dialog/pharmacy-modal-dialog.component';

@Component({
  selector: 'app-pharmacist-profile',
  templateUrl: './pharmacist-profile.component.html',
  styleUrls: ['./pharmacist-profile.component.scss']
})
export class PharmacistProfileComponent implements OnInit {

  public id : number;
  public pharmacist: Pharmacist;
  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public city: string = '';
  public street: string = '';
  public country: string = '';

  constructor(private pharmacistService: PharmacistService, private authService : AuthenticationService,
    private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { 
      this.fillData();
  }

  ngOnInit(): void {

  }
  
  fillData() {
    this.pharmacistService.getPharmacistById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacist = data;
        this.prepareDate(this.pharmacist); 
      }
    );
  }

  prepareDate(pharmacist: Pharmacist) : void {
    this.id = pharmacist.id;
    this.name = pharmacist.firstName;
    this.surname = pharmacist.lastName;
    this.email = pharmacist.email;
    this.phoneNumber = pharmacist.phoneNumber;
    this.city = pharmacist.city;
    this.street = pharmacist.street;
    this.country = pharmacist.country;
  }

  cancelClick(): void {
      this.fillData();
  }

  saveClick(): void {
    if (this.checkInputData()) {
      if (confirm("Da li ste sigurni da želite da sačuvate izmene?")) {   
          this.updatePharmacist();
      }
    }
  }

  updatePharmacist(): void {
    this.pharmacistService.updatePharmacist(this.id, new Pharmacist(this.pharmacist.id,  this.name, this.surname, this.city, this.country,  this.street, this.email, this.phoneNumber, encodeURIComponent(this.password), 0)).subscribe(
      data => {
        this.pharmacist = data;
        this.prepareDate(this.pharmacist);
        this.openSnackBar('Uspešno ste izmenili profil!', 'Zatvori');
        if (this.password.length > 0) {
          this.authService.logout();
          this.router.navigate(['login']);
        }
      },
      error => {
        if (error.status = 500){
          this.openSnackBar('Neuspešna izmena profila!', 'Zatvori');
          this.fillData();
        }
      });
  }

  checkInputData() : boolean {
    if (this.isPasswordValid() && this.isRequiredDataNotEmpty()) {
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

  isRequiredDataNotEmpty() : boolean {
    if (this.name === '' || this.surname === ''
          || this.phoneNumber === '' || this.city === ''
            || this.street === '' || this.country === '') {
      this.openSnackBar('Sva obavezna polja moraju biti popunjena!', 'Zatvori');
      return false;
    }
    return true;
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

  openDialog(): void {
    this.dialog.open(PharmacyModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '420px',
      height: '200px',
      position: {left: '675px'}
    });
  }
}
