import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/users/patient.service';
import { MedicineService } from '../../services/medicines/medicine.service';
import { Medicine } from '../../models/medicine.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { PharmacyAdministratorService } from '../../services/users/pharmacy-administrator.service';
import { User } from '../../models/user.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-pharmacy-administrator-profile',
  templateUrl: './pharmacy-administrator-profile.component.html',
  styleUrls: ['./pharmacy-administrator-profile.component.scss']
})
export class PharmacyAdministratorProfileComponent implements OnInit {

  public id : number;
  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public city: string = '';
  public street: string = '';
  public country: string = '';

  public pharmacyAdministrator: User;

  public pharmacy: Pharmacy;

  constructor(private snackBar: MatSnackBar, private authService : AuthenticationService, private userService: UserService, 
              private pharmacyAdministratorService: PharmacyAdministratorService, private pharmacyService: PharmacyService, private router: Router) { 
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
      }
    );
    this.fillData();
  }

  ngOnInit(): void {
  }

  fillData() {
    this.userService.getUserById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacyAdministrator = data;
        this.prepareDate(this.pharmacyAdministrator); 
      }
    );
  }

  prepareDate(pharmacyAdministrator: User) : void {
    this.id = pharmacyAdministrator.id;
    this.name = pharmacyAdministrator.firstName;
    this.surname = pharmacyAdministrator.lastName;
    this.email = pharmacyAdministrator.email;
    this.phoneNumber = pharmacyAdministrator.phoneNumber;
    this.city = pharmacyAdministrator.city;
    this.street = pharmacyAdministrator.street;
    this.country = pharmacyAdministrator.country;
  }

  cancelClick(): void {
    this.fillData();
}

saveClick(): void {
  if (this.checkInputData()) {
    if (confirm("Da li ste sigurni da želite da sačuvate izmene?")) {   
        this.updatePharmacyAdministrator();
    }
  }
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

updatePharmacyAdministrator(): void {
  this.pharmacyAdministratorService.updatePharmacyAdministrator(this.id, new User(this.pharmacyAdministrator.id,  this.name, this.surname, this.city, this.country,  this.street, this.email, this.phoneNumber, encodeURIComponent(this.password)), this.pharmacy.id).subscribe(
    data => {
      this.pharmacyAdministrator = data;
      this.prepareDate(this.pharmacyAdministrator);
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
