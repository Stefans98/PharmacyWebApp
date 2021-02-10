import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Medicine } from '../../models/medicine.model';
import { PharmacyMedicine } from '../../models/pharmacy-medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyMedicineService } from '../../services/medicines/pharmacy-medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

export interface MedicineItem {
  code: string;
  name: string;
  quantity: number;
}


@Component({
  selector: 'app-all-available-medicines',
  templateUrl: './all-available-medicines.component.html',
  styleUrls: ['./all-available-medicines.component.scss']
})

export class AllAvailableMedicinesComponent implements OnInit {

  public medicinesForPharmacy: PharmacyMedicine[];
  public medicinesItemList: MedicineItem[] = [];
  public pharmacy: Pharmacy;

  displayedColumns = ['code', 'name', 'quantity', 'delete'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacyService: PharmacyService, private authService: AuthenticationService, private medicineService: MedicineService, 
              private pharmacyMedicineService: PharmacyMedicineService) { 
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.pharmacyMedicineService.getMedicinesForPharmacy(this.pharmacy.id).subscribe(
          data => {
            this.medicinesForPharmacy = data;
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

  delete(medicinePharmacy){
    this.pharmacyMedicineService.deletePharmacyMedicine(medicinePharmacy, this.pharmacy.id).subscribe(
      data => {
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            this.pharmacyMedicineService.getMedicinesForPharmacy(this.pharmacy.id).subscribe(
              data => {
                this.medicinesForPharmacy = data;
              },
              error => {
                this.medicinesForPharmacy = [];  
              }
            );
          }
        );
        this.openSnackBar('Lek je uspešno obrisan!', 'Zatvori');
      },
      error => {
        if(error.status == 400){
          this.openSnackBar('Nije moguće obrisati lek jer postoje rezervacije za isti!', 'Zatvori');
        }
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
