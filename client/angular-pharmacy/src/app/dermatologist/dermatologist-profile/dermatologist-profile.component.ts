import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Dermatologist } from '../../models/dermatologist.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
import { PharmaciesModalDialogComponent } from './pharmacies-modal-dialog/pharmacies-modal-dialog.component';

@Component({
  selector: 'app-dermatologist-profile',
  templateUrl: './dermatologist-profile.component.html',
  styleUrls: ['./dermatologist-profile.component.scss']
})

export class DermatologistProfileComponent implements OnInit {

  public id : number;
  public dermatologist: Dermatologist;
  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public city: string = '';
  public street: string = '';
  public country: string = '';

  constructor(private dermatologistService: DermatologistService, private authService : AuthenticationService,
    private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { 
      this.fillData();
  }

  ngOnInit(): void {

  }
  
  fillData() {
    this.dermatologistService.getDermatologistById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.dermatologist = data;
        this.prepareDate(this.dermatologist); 
      }
    );
  }

  prepareDate(dermatologist: Dermatologist) : void {
    this.id = dermatologist.id;
    this.name = dermatologist.firstName;
    this.surname = dermatologist.lastName;
    this.email = dermatologist.email;
    this.phoneNumber = dermatologist.phoneNumber;
    this.city = dermatologist.city;
    this.street = dermatologist.street;
    this.country = dermatologist.country;
  }

  cancelClick(): void {
      this.fillData();
  }

  saveClick(): void {
    if (this.checkInputData()) {
      if (confirm("Da li ste sigurni da želite da sačuvate izmene?")) {   
          this.updateDermatologist();
      }
    }
  }

  updateDermatologist(): void {
    this.dermatologistService.updateDermatologist(this.id, new Dermatologist(this.dermatologist.id,  this.name, this.surname, this.city, this.country,  this.street, this.email, this.phoneNumber, encodeURIComponent(this.password))).subscribe(
      data => {
        this.dermatologist = data;
        this.prepareDate(this.dermatologist);
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
    this.dialog.open(PharmaciesModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '450px',
      height: '230px',
      position: {left: '675px'}
    });
  }
}
