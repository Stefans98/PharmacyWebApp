import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pharmacy } from '../../../../models/pharmacy.model';
import { PharmacyService } from '../../../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-medicine-pharmacy-modal-dialog',
  templateUrl: './medicine-pharmacy-modal-dialog.component.html',
  styleUrls: ['./medicine-pharmacy-modal-dialog.component.scss']
})
export class MedicinePharmacyModalDialogComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  dataSource = new MatTableDataSource(this.pharmacies);
  displayedColumns: string[] = ['name', 'averageGrade', 'address'];

  constructor(public dialogRef : MatDialogRef<MedicinePharmacyModalDialogComponent>, private pharmacyService : PharmacyService,
              @Inject(MAT_DIALOG_DATA) private medicineCode : string) {
    this.pharmacyService.getAllPharmaciesWithMedicine(medicineCode).subscribe(
      data => {
        this.pharmacies = data;
        this.dataSource.data = this.pharmacies;
      }
    );
   }

  ngOnInit(): void {
  }

  getRecord(row): void {
    this.dialogRef.close({pharmacy : row});
  }

}
