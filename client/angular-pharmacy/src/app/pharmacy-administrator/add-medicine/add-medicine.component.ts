import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Medicine } from '../../models/medicine.model';
import { PharmacyMedicine } from '../../models/pharmacy-medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyMedicineService } from '../../services/medicines/pharmacy-medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {

  public medicineList: Medicine[];
  public pharmacy: Pharmacy;

  displayedColumns = ['code', 'name', 'add'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private authService: AuthenticationService, private pharmacyService: PharmacyService, private medicineService: MedicineService,
              private pharmacyMedicineService: PharmacyMedicineService) {
    this.pharmacyService.getPharmacyByPharmacyAdminId(authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        medicineService.getAllMedicinesNotForPharmacy(this.pharmacy.id).subscribe(
          data => {
            this.medicineList = data;
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

  add(medicine){
    var pharmacyMedicine = new PharmacyMedicine(null, this.pharmacy, medicine, 0);
    this.pharmacyMedicineService.addPharmacyMedicine(pharmacyMedicine).subscribe(
      data => {
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            this.medicineService.getAllMedicinesNotForPharmacy(this.pharmacy.id).subscribe(
              data => {
                this.medicineList = data;
              },
              error => {
                this.medicineList = [];
              }
            );
          }
        );
        this.openSnackBar('Lek je uspešno dodat!', 'Zatvori');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 30500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
