import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Complaint } from '../../../models/complaint.model';
import { Dermatologist } from '../../../models/dermatologist.model';
import { Medicine } from '../../../models/medicine.model';
import { Pharmacist } from '../../../models/pharmacist.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { ComplaintService } from '../../../services/users/complaint.service';
import { ChooseGradeEntityModalDialogComponent } from './choose-grade-entity-modal-dialog/choose-grade-entity-modal-dialog.component';

@Component({
  selector: 'app-new-grading',
  templateUrl: './new-grading.component.html',
  styleUrls: ['./new-grading.component.scss']
})
export class NewGradingComponent implements OnInit {
  selectedGrade: string;
  grades: string[] = ['5', '6', '7', '8', '9', '10']

  selectedGradeType: string;
  gradeTypes: string[] = ['Ocena za apoteku', 'Ocena za farmaceuta', 'Ocena za dermatologa', 'Ocena za lek' ]
  gradeEntityType: string;
  entityName: string;

  chosenPharmacy: Pharmacy;
  chosenDermatologist: Dermatologist;
  chosenPharmacist: Pharmacist;
  chosenMedicine: Medicine;

  // napravi servis za ocenjivanje i dodaj ga ovde
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private authService: AuthenticationService) {
    this.selectedGradeType = 'Ocena za apoteku';
    this.gradeEntityType = 'PHARMACY_GRADE';
   }

  ngOnInit(): void {
  }

  chooseGradeEntityClick(): void {
    const dialogRef = this.dialog.open(ChooseGradeEntityModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '350px',
      data: {gradeEntityType : this.gradeEntityType}
    });

    dialogRef.afterClosed().subscribe(data => {
      if (this.selectedGradeType === 'Ocena za apoteku') {
        if (data) {
          this.chosenPharmacy = data.pharmacy;
          this.entityName = this.chosenPharmacy.name;
        }
      } else if (this.selectedGradeType === 'Ocena za farmaceuta') {
        if (data) {
          this.chosenPharmacist = data.pharmacist;
          this.entityName = this.chosenPharmacist.firstName + ' ' + this.chosenPharmacist.lastName;
        }
      }  else if (this.selectedGradeType === 'Ocena za dermatologa') {
        if (data) {
          this.chosenDermatologist = data.dermatologist;
          this.entityName = this.chosenDermatologist.firstName + ' ' + this.chosenDermatologist.lastName;
        }
      } else if (this.selectedGradeType === 'Ocena za lek') {
        if (data) {
          this.chosenMedicine = data.medicine;
          this.entityName = this.chosenMedicine.name;
        }
      }
    })
  }

  gradeClick(): void {
    if (this.selectedGradeType === 'Ocena za apoteku') {

    } else if (this.selectedGradeType === 'Ocena za farmaceuta') {

    } else if (this.selectedGradeType === 'Ocena za dermatologa') {

    } else if (this.selectedGradeType === 'Ocena za lek') {

    }
  }

  changeGradeEntityType(selectedGradeType): void {
    this.selectedGradeType = selectedGradeType;
    if (this.selectedGradeType === 'Ocena za apoteku') {
      this.gradeEntityType = 'PHARMACY_GRADE';
    } else if (this.selectedGradeType === 'Ocena za farmaceuta') {
      this.gradeEntityType = 'PHARMACIST_GRADE';
    }  else if (this.selectedGradeType === 'Ocena za dermatologa') {
      this.gradeEntityType = 'DERMATOLOGIST_GRADE';
    } else if (this.selectedGradeType === 'Ocena za lek') {
      this.gradeEntityType = 'MEDICINE_GRADE';
    }
    this.entityName = '';
  }

  parseGradeEntityType(): string {
    if (this.gradeEntityType === 'PHARMACY_GRADE') {
      return 'Apoteka';
    } else if (this.gradeEntityType === 'PHARMACIST_GRADE') {
      return 'Farmaceut';
    } else if (this.gradeEntityType === 'DERMATOLOGIST_GRADE') {
      return 'Dermatolog';
    } else if (this.gradeEntityType === 'MEDICINE_GRADE') {
      return 'Lek';
    }
  }

  selectEntityButtonText(): string {
    if (this.gradeEntityType === 'PHARMACY_GRADE') {
      return 'Izaberi apoteku';
    } else if (this.gradeEntityType === 'PHARMACIST_GRADE') {
      return 'Izaberi farmaceuta';
    } else if (this.gradeEntityType === 'DERMATOLOGIST_GRADE') {
      return 'Izaberi dermatologa';
    } else if (this.gradeEntityType === 'MEDICINE_GRADE') {
      return 'Izaberi lek';
    }
  }

  onChangeGrade(selectedGrade) {
    this.selectedGrade = selectedGrade;
  }
}
