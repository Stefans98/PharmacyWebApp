import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Dermatologist } from '../../../../models/dermatologist.model';
import { Medicine } from '../../../../models/medicine.model';
import { Pharmacist } from '../../../../models/pharmacist.model';
import { Pharmacy } from '../../../../models/pharmacy.model';
import { MedicineService } from '../../../../services/medicines/medicine.service';
import { PharmacyService } from '../../../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../../../services/users/authentication.service';
import { PatientService } from '../../../../services/users/patient.service';

@Component({
  selector: 'app-choose-grade-entity-modal-dialog',
  templateUrl: './choose-grade-entity-modal-dialog.component.html',
  styleUrls: ['./choose-grade-entity-modal-dialog.component.scss']
})
export class ChooseGradeEntityModalDialogComponent implements OnInit {

  gradeType: string;
  pharmacies: Pharmacy[] = [];
  pharmacists: Pharmacist[] = [];
  dermatologists: Dermatologist[] = [];
  medicines: Medicine[] = [];
  pharmacyDataSource = new MatTableDataSource(this.pharmacies);
  pharmacyDisplayedColumns: string[] = ['name', 'averageGrade', 'address'];
  pharmacistDataSource = new MatTableDataSource(this.pharmacists);
  pharmacistDisplayedColumns: string[] = ['name', 'email'];
  dermatologistDataSource = new MatTableDataSource(this.dermatologists);
  dermatologistDisplayedColumns: string[] = ['name', 'email'];
  medicineDataSource = new MatTableDataSource(this.medicines);
  medicineDisplayedColumns: string[] = ['name', 'code'];

  constructor(public dialogRef : MatDialogRef<ChooseGradeEntityModalDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data, private patientService: PatientService, private authService: AuthenticationService,
    private pharmacyService: PharmacyService, private medicineService: MedicineService) { 

    if (data.gradeEntityType == 'PHARMACY_GRADE') {
      this.gradeType = 'Ocena za apoteku';
      this.pharmacyService.getPharmaciesForPatientAppointmentsAndReservations(this.authService.getLoggedUserId())
          .subscribe(data => {
            this.pharmacies = data;
            this.pharmacyDataSource.data = this.pharmacies;
          })
    } else if (data.gradeEntityType == 'PHARMACIST_GRADE') {
      this.gradeType = 'Ocena za farmaceuta';
      this.patientService.getPharmacistsThatCounseledPatient(this.authService.getLoggedUserId()).subscribe(data => {
        this.pharmacists = data;
        this.pharmacistDataSource.data = this.pharmacists;
      })
    } else if (data.gradeEntityType == 'DERMATOLOGIST_GRADE') {
      this.gradeType = 'Ocena za dermatologa';
      this.patientService.getDermatologistsThatExaminedPatient(this.authService.getLoggedUserId()).subscribe(data => {
        this.dermatologists = data;
        this.dermatologistDataSource.data = this.dermatologists;
      })
    } else if (data.gradeEntityType == 'MEDICINE_GRADE') {
      this.gradeType = 'Ocena za lek';
      this.medicineService.getMedicinesForPatientCompletedReservations(this.authService.getLoggedUserId()).subscribe(data => {
        this.medicines = data;
        this.medicineDataSource.data = this.medicines;
      })
    }   
  }

  ngOnInit(): void {
  }

  choosePharmacy(row) : void {
    this.dialogRef.close({pharmacy : row});
  }

  chooseDermatologist(row) : void {
    this.dialogRef.close({dermatologist : row});
  }

  choosePharmacist(row) : void {
    this.dialogRef.close({pharmacist : row});
  }

  chooseMedicine(row) : void {
    this.dialogRef.close({medicine : row});
  }

}
