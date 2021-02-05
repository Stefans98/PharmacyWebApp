import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Medicine } from '../../../models/medicine.model';
import { MedicineService } from '../../../services/medicines/medicine.service';

@Component({
  selector: 'app-subscription-medicines-modal-dialog',
  templateUrl: './subscription-medicines-modal-dialog.component.html',
  styleUrls: ['./subscription-medicines-modal-dialog.component.scss']
})
export class SubscriptionMedicinesModalDialogComponent implements OnInit, AfterViewInit {

  public medicineSubtitutions : Medicine[] = [];
  public selectedMedicine : Medicine;
  public medicineForPrescription : Medicine;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialogRef: MatDialogRef<SubscriptionMedicinesModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedMedicineData: { selectedMedicine : Medicine }, 
      private medicineService : MedicineService, private snackBar: MatSnackBar) { 
        this.selectedMedicine = selectedMedicineData.selectedMedicine;
      }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void {
    this.medicineService.getMedicineSubstitutions(this.selectedMedicine.id).subscribe(
      data => {
        this.medicineSubtitutions = data;
      },
      error => {
        if (error.status = 404){

        } 
      });
  }
  
  substituteMedicineClick() : void {
    if(this.medicineForPrescription == null) {
      this.openSnackBar('Morate selektovati lek da bi ga prepisali pacijentu!', 'Zatvori', 3000);
      return;
    }
    this.dialogRef.close();
  }

  closeDialogClick(): void {
    this.dialogRef.close();
  }

  showRow(medicine : Medicine): string {
    return medicine.name + ', ' + medicine.medicineType;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
