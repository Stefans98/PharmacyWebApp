import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Medicine } from '../../../models/medicine.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-dispensed-drugs',
  templateUrl: './dispensed-drugs.component.html',
  styleUrls: ['./dispensed-drugs.component.scss']
})
export class DispensedDrugsComponent implements OnInit {

  medicines: Medicine[] = [];
  displayedColumns: string[] = ['name', 'manufacturer', 'code', 'dailyDose'];
  dataSource = new MatTableDataSource(this.medicines);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private medicineService: MedicineService, private authenticationService: AuthenticationService) {
    this.medicineService.getMedicinesFromEPrescriptionByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.medicines = data;
        this.dataSource.data = this.medicines;
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Trenutno ne postoji nijedan izdat lek preko eRecepta!', 'Zatvori', 3500);
        }
      }
    );
  }

  ngOnInit(): void {}

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
