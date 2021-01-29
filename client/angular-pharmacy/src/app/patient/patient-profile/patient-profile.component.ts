import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/users/patient.service';
import { BenefitsModalDialogComponent } from './benefits-modal-dialog/benefits-modal-dialog.component';
import { MedicineService } from '../../services/medicines/medicine.service';
import { Medicine } from '../../models/medicine.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  public id : number;
  public patient: Patient;
  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public city: string = '';
  public street: string = '';
  public country: string = '';
  medicines = new FormControl();
  public medicineList: Medicine[] = [];
  public points: number;
  public userCategory: number;
  public category: string = '';

  constructor(public dialog: MatDialog, private patientService: PatientService, private router: Router,
    private medicineService: MedicineService, private snackBar: MatSnackBar, private authService : AuthenticationService) { 

      this.medicineService.getAll().subscribe(
        data => {
          this.medicineList = data;
        }
      );
      this.fillData();
  }
  
  fillData() {
    this.patientService.getPatientById(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.patient = data;
        this.prepareDate(this.patient); 
      }
    );
  }

  prepareDate(patient: Patient) : void {
    this.id = patient.id;
    this.name = patient.firstName;
    this.surname = patient.lastName;
    this.email = patient.email;
    this.phoneNumber = patient.phoneNumber;
    this.city = patient.city;
    this.street = patient.street;
    this.country = patient.country;
    this.points = patient.points;
    if (patient.userCategory == 0) {
      this.category = 'Regular';
    } else if (patient.userCategory == 1) {
      this.category = 'Silver';
    } else {
      this.category = 'Gold';
    }
  }

  ngOnInit(): void {

  }

  cancelClick(): void {
      this.fillData();
  }

  saveClick(): void {
    if (this.checkInputData()) {
      if (confirm("Da li ste sigurni da želite da sačuvate izmene?")) {   
          this.updatePatient();
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

  updatePatient(): void {
    this.patientService.updatePatient(this.id, new Patient(this.patient.id,  this.name, this.surname, this.city, this.country,  this.street, this.email, this.phoneNumber, this.points, this.userCategory, encodeURIComponent(this.password))).subscribe(
      data => {
        this.patient = data;
        this.prepareDate(this.patient);
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

  // TOAST

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  // MODALNI DIALOG
  
  openDialog(): void {
    this.dialog.open(BenefitsModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '450px',
      height: '250px',
      position: {left: '675px'}
    });
  }
}
