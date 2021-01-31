import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineReservation } from '../../../models/medicineReservation.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-reserved-drugs',
  templateUrl: './reserved-drugs.component.html',
  styleUrls: ['./reserved-drugs.component.scss']
})
export class ReservedDrugsComponent implements OnInit {

  checked = false;
  indeterminate = false;

  medicines: MedicineReservation[] = [];
  displayedColumns: string[] = ['name', 'manufacturer', 'price', 'pharmacy', 'final_purchasing_date', 'canceling'];
  dataSource = new MatTableDataSource(this.medicines);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private medicineService: MedicineService, private authenticationService: AuthenticationService) {
    this.medicineService.getAllReservedMedicinesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.medicines = data;
        this.dataSource.data = this.medicines;
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Trenutno ne postoji nijedan rezervisani lek!', 'Zatvori');
        }
      }
    );
  }

  ngOnInit(): void {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
