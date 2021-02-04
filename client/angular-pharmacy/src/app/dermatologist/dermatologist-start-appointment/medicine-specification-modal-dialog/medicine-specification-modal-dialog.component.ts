import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medicine } from '../../../models/medicine.model';

@Component({
  selector: 'app-medicine-specification-modal-dialog',
  templateUrl: './medicine-specification-modal-dialog.component.html',
  styleUrls: ['./medicine-specification-modal-dialog.component.scss']
})
export class MedicineSpecificationModalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MedicineSpecificationModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public medicineData: { medicine : Medicine },
     @Inject(MAT_DIALOG_DATA) public inputData: { therapyDay : number }) { 
  }

  ngOnInit(): void {
    
  }

  closeDialogClick(): void {
    this.dialogRef.close();
  }

}
