import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Dermatologist } from '../../../models/dermatologist.model';
import { Grade } from '../../../models/grade.model';
import { Medicine } from '../../../models/medicine.model';
import { Pharmacist } from '../../../models/pharmacist.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { GradeService } from '../../../services/users/grade.service';
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, 
      private authService: AuthenticationService, private gradeService: GradeService) {
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
      this.gradeService.gradePharmacy(new Grade(0, this.gradeEntityType, Number(this.selectedGrade),
        this.authService.getLoggedUserId(), null, this.chosenPharmacy.id, null, 0, null, 0, null, 0, null)).subscribe(
          data => {
            this.openSnackBar('Uspešno ste ocenili apoteku!', 'Zatvori', 25000);
        },
        error => {
          if (error.status == 400){
            this.openSnackBar('Već ste ocenili ovu apoteku! Moguća je samo promena ocene u delu za promenu ocene!', 'Zatvori', 4700);
          } else {  
            this.openSnackBar('Neuspešno ocenjivanje!', 'Zatvori', 2500);
          }
        });
    } else if (this.selectedGradeType === 'Ocena za farmaceuta') {
      this.gradeService.gradePharmacist(new Grade(0, this.gradeEntityType, Number(this.selectedGrade),
        this.authService.getLoggedUserId(), null, 0, null, this.chosenPharmacist.id, null, 0, null, 0, null)).subscribe(
          data => {
            this.openSnackBar('Uspešno ste ocenili farmaceuta!', 'Zatvori', 25000);
        },
        error => {
          if (error.status == 400){
            this.openSnackBar('Već ste ocenili ovog farmaceuta! Moguća je samo promena ocene u delu za promenu ocene!', 'Zatvori', 4700);
          } else {  
            this.openSnackBar('Neuspešno ocenjivanje!', 'Zatvori', 2500);
          }
        });
    } else if (this.selectedGradeType === 'Ocena za dermatologa') {
      this.gradeService.gradeDermatologist(new Grade(0, this.gradeEntityType, Number(this.selectedGrade),
        this.authService.getLoggedUserId(),null, 0, null, 0, null, this.chosenDermatologist.id, null, 0, null)).subscribe(
          data => {
            this.openSnackBar('Uspešno ste ocenili dermatologa!', 'Zatvori', 25000);
        },
        error => {
          if (error.status == 400){
            this.openSnackBar('Već ste ocenili ovog dermatologa! Moguća je samo promena ocene u delu za promenu ocene!', 'Zatvori', 4700);
          } else {  
            this.openSnackBar('Neuspešno ocenjivanje!', 'Zatvori', 2500);
          }
        });
    } else if (this.selectedGradeType === 'Ocena za lek') {
      this.gradeService.gradeMedicine(new Grade(0, this.gradeEntityType, Number(this.selectedGrade),
        this.authService.getLoggedUserId(),null, 0, null, 0, null, 0, null, this.chosenMedicine.id, null)).subscribe(
          data => {
            this.openSnackBar('Uspešno ste ocenili lek!', 'Zatvori', 25000);
        },
        error => {
          if (error.status == 400){
            this.openSnackBar('Već ste ocenili ovaj lek! Moguća je samo promena ocene u delu za promenu ocene!', 'Zatvori', 4700);
          } else {  
            this.openSnackBar('Neuspešno ocenjivanje!', 'Zatvori', 2500);
          }
        });
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

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
