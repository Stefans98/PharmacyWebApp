import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pharmacy } from '../../../models/pharmacy.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-pharmacies-modal-dialog',
  templateUrl: './pharmacies-modal-dialog.component.html',
  styleUrls: ['./pharmacies-modal-dialog.component.scss']
})
export class SysAdminPharmaciesModalDialogComponent implements OnInit {

  pharmacies: Pharmacy[] = [];
  dataSource = new MatTableDataSource(this.pharmacies);
  displayedColumns: string[] = ['name', 'averageGrade', 'address'];

  constructor(public dialogRef : MatDialogRef<SysAdminPharmaciesModalDialogComponent>, private pharmacyService : PharmacyService) {
    this.pharmacyService.getAllPharmacies().subscribe(
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
