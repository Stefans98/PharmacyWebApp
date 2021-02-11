import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicineSpecification } from '../../../../models/medicine-specification.model';

@Component({
  selector: 'app-specification-modal-dialog',
  templateUrl: './specification-modal-dialog.component.html',
  styleUrls: ['./specification-modal-dialog.component.scss']
})
export class SpecificationModalDialogComponent implements OnInit {

  medicineSpecification : MedicineSpecification

  constructor(@Inject(MAT_DIALOG_DATA) private specification, private dialogRef : MatDialogRef<SpecificationModalDialogComponent>) {
    this.medicineSpecification = specification;
   }

  ngOnInit(): void {
  }

  confirmClick() : void {
    this.dialogRef.close();
  }

}
