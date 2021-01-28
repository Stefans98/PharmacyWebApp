import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/users/patient.service';
import { BenefitsModalDialogComponent } from './benefits-modal-dialog/benefits-modal-dialog.component';
import { MedicineService } from '../../services/medicines/medicine.service';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  public id : number;
  public patient: Patient;
  public name: string;
  public surname: string;
  public email: string;
  public phoneNumber: string;
  public password: string = '';
  public repeatPassword: string = '';
  public city: string;
  public street: string;
  public country: string;
  medicines = new FormControl();
  public medicineList: Medicine[] = [];
  public points: number;
  public userCategory: number;
  public category: string;

  constructor(public dialog: MatDialog, private patientService: PatientService,  private medicineService: MedicineService) { 

      this.medicineService.getAll().subscribe(
        data => {
          this.medicineList = data;
        }
      );
      this.fillData();
  }
  
  fillData() {
    this.patientService.getPatientById(1).subscribe(
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
    if(patient.userCategory == 0) {
      this.category = 'Regular';
    } else if (patient.userCategory == 1) {
      this.category = 'Silver';
    } else {
      this.category = 'Gold';
    }
  }

  ngOnInit(): void {

  }

  openDialog(): void {
    this.dialog.open(BenefitsModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '450px',
      height: '250px',
      position: {left: '855px'}
    });
  }

  cancelClick(): void {
    if(confirm("Da li ste sigurni da želite da odustanete?")) {
      this.fillData();
    }
  }

  saveClick(): void {
    if(confirm("Da li ste sigurni da želite da sačuvate izmene?")) {
      this.updatePatient();
    }
  }

  updatePatient(): void {
    this.patientService.updatePatient(this.id, new Patient(this.patient.id,  this.name, this.surname, this.city, this.country,  this.street, this.email, this.phoneNumber, this.points, this.userCategory, encodeURIComponent(this.password))).subscribe(
      data => {
        this.patient = data;
        this.prepareDate(this.patient);
      },
      error => {
        if (error.status = 500){
          if(confirm("Nije moguće promeniti podatke")) { }
        }
      });
  }
}
