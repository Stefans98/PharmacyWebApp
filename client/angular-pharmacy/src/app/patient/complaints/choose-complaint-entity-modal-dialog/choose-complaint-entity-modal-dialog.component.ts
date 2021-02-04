import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Dermatologist } from '../../../models/dermatologist.model';
import { Pharmacist } from '../../../models/pharmacist.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
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
    @Inject(MAT_DIALOG_DATA) private data, private patientService: PatientService, private authService: AuthenticationService,
    private pharmacyService: PharmacyService) { 

    if (data.complaintEntityType == 'PHARMACY_COMPLAINT') {
      this.complaintType = 1;
      this.pharmacyService.getPharmaciesForPatientAppointmentsAndReservations(this.authService.getLoggedUserId())
          .subscribe(data => {
            this.pharmacies = data;
            this.pharmacyDataSource.data = this.pharmacies;
          })
    } else if (data.complaintEntityType == 'PHARMACIST_COMPLAINT') {
      this.complaintType = 2;
      this.patientService.getPharmacistsThatCounseledPatient(this.authService.getLoggedUserId()).subscribe(data => {
        this.pharmacists = data;
        this.pharmacistDataSource.data = this.pharmacists;
      })
    } else if (data.complaintEntityType == 'DERMATOLOGIST_COMPLAINT') {
      this.complaintType = 3;
      this.patientService.getDermatologistsThatExaminedPatient(this.authService.getLoggedUserId()).subscribe(data => {
        this.dermatologists = data;
        this.dermatologistDataSource.data = this.dermatologists;
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

}
