import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Dermatologist } from '../../../models/dermatologist.model';
import { Pharmacist } from '../../../models/pharmacist.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { PatientService } from '../../../services/users/patient.service';

@Component({
  selector: 'app-choose-complaint-entity-modal-dialog',
  templateUrl: './choose-complaint-entity-modal-dialog.component.html',
  styleUrls: ['./choose-complaint-entity-modal-dialog.component.scss']
})
export class ChooseComplaintEntityModalDialogComponent implements OnInit {

  complaintType: number;
  pharmacies: Pharmacy[] = [];
  pharmacists: Pharmacist[] = [];
  dermatologists: Dermatologist[] = [];
  pharmacyDataSource = new MatTableDataSource(this.pharmacies);
  pharmacyDisplayedColumns: string[] = ['name', 'averageGrade', 'address'];
  pharmacistDataSource = new MatTableDataSource(this.pharmacists);
  pharmacistDisplayedColumns: string[] = ['name', 'email'];
  dermatologistDataSource = new MatTableDataSource(this.dermatologists);
  dermatologistDisplayedColumns: string[] = ['name', 'email'];

  constructor(public dialogRef : MatDialogRef<ChooseComplaintEntityModalDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private data, private patientService: PatientService, private authService: AuthenticationService) { 
    if (data.complaintEntityType == 'PHARMACY_COMPLAINT') {
      this.complaintType = 1;
    } else if (data.complaintEntityType == 'PHARMACIST_COMPLAINT') {
      this.complaintType = 2;
      patientService.getPharmacistsThatCounseledPatient(authService.getLoggedUserId()).subscribe(data => {
        this.pharmacists = data;
        this.pharmacistDataSource.data = this.pharmacists;
      })
    } else if (data.complaintEntityType == 'DERMATOLOGIST_COMPLAINT') {
      this.complaintType = 3;
      patientService.getDermatologistsThatExaminedPatient(authService.getLoggedUserId()).subscribe(data => {
        this.dermatologists = data;
        this.dermatologistDataSource.data = this.dermatologists;
      })
    }
    
  }

  ngOnInit(): void {
  }

  chooseDermatologist(row) : void {
    this.dialogRef.close({dermatologist : row});
  }

  choosePharmacist(row) : void {
    this.dialogRef.close({pharmacist : row});
  }

}
