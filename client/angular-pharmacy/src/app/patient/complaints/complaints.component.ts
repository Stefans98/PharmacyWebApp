import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Complaint } from '../../models/complaint.model';
import { Dermatologist } from '../../models/dermatologist.model';
import { Pharmacist } from '../../models/pharmacist.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { ComplaintService } from '../../services/users/complaint.service';
import { ChooseComplaintEntityModalDialogComponent } from './choose-complaint-entity-modal-dialog/choose-complaint-entity-modal-dialog.component';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  complaintType: number;
  complaintText: string;
  complaintEntityType: string;
  entityName: string;

  chosenPharmacy: Pharmacy;
  chosenDermatologist: Dermatologist;
  chosenPharmacist: Pharmacist;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private complaintService: ComplaintService,
                private authService: AuthenticationService) {
    this.complaintType = 1;
    this.complaintEntityType = 'PHARMACY_COMPLAINT';
   }

  ngOnInit(): void {
  }

  choseComplaintEntityClick(): void {
    const dialogRef = this.dialog.open(ChooseComplaintEntityModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '350px',
      data: {complaintEntityType : this.complaintEntityType}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (this.complaintType == 1) {
        if (data) {
          this.chosenPharmacy = data.pharmacy;
          this.entityName = this.chosenPharmacy.name;
        }
      } else if (this.complaintType == 2) {
        if (data) {
          this.chosenPharmacist = data.pharmacist;
          this.entityName = this.chosenPharmacist.firstName + ' ' + this.chosenPharmacist.lastName;
        }
      }  else if (this.complaintType == 3) {
        if (data) {
          this.chosenDermatologist = data.dermatologist;
          this.entityName = this.chosenDermatologist.firstName + ' ' + this.chosenDermatologist.lastName;
        }
      }
    })
  }

  sendComplaintClick(): void {
    if (this.complaintType == 1) {
      this.complaintService.sendPharmacyComplaint(new Complaint(0, this.complaintEntityType, this.complaintText, false,
        this.authService.getLoggedUserId(), null, this.chosenPharmacy.id, null, 0, null, 0, null)).subscribe(data => {
         this.snackBar.open('Vaša žalba je poslata!', null, { 
           duration : 3000, 
           verticalPosition: 'top'
          });
        });
    } else if (this.complaintType == 2) {
      this.complaintService.sendPharmacistComplaint(new Complaint(0, this.complaintEntityType, this.complaintText, false,
        this.authService.getLoggedUserId(), null, 0, null, this.chosenPharmacist.id, null, 0, null)).subscribe(data => {
         this.snackBar.open('Vaša žalba je poslata!', null, { 
           duration : 3000, 
           verticalPosition: 'top'
          });
        });
    } else if (this.complaintType == 3) {
      this.complaintService.sendDermatologistComplaint(new Complaint(0, this.complaintEntityType, this.complaintText, false,
         this.authService.getLoggedUserId(), null, 0, null, 0, null, this.chosenDermatologist.id, null)).subscribe(data => {
          this.snackBar.open('Vaša žalba je poslata!', null, { 
            duration : 3000, 
            verticalPosition: 'top'
           });
         });
    }
  }

  changeComplaintEntityType(): void {
    if (this.complaintType == 1) {
      this.complaintEntityType = 'PHARMACY_COMPLAINT';
    } else if (this.complaintType == 2) {
      this.complaintEntityType = 'PHARMACIST_COMPLAINT';
    }  else if (this.complaintType == 3) {
      this.complaintEntityType = 'DERMATOLOGIST_COMPLAINT';
    }
    this.entityName = '';
  }

  parseComplaintEntityType(): string {
    if (this.complaintEntityType === 'PHARMACY_COMPLAINT') {
      return 'Apoteka';
    } else if (this.complaintEntityType === 'PHARMACIST_COMPLAINT') {
      return 'Farmaceut';
    } else if (this.complaintEntityType === 'DERMATOLOGIST_COMPLAINT') {
      return 'Dermatolog';
    }
  }

  selectEntityButtonText(): string {
    if (this.complaintEntityType === 'PHARMACY_COMPLAINT') {
      return 'Izaberi apoteku';
    } else if (this.complaintEntityType === 'PHARMACIST_COMPLAINT') {
      return 'Izaberi farmaceuta';
    } else if (this.complaintEntityType === 'DERMATOLOGIST_COMPLAINT') {
      return 'Izaberi dermatologa';
    }
  }


}
