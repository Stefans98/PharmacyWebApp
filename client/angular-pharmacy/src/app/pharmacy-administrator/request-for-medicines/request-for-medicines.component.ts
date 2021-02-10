import { Component, OnInit } from '@angular/core';
import { MedicineInquiry } from '../../models/medicine-inquiry.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-request-for-medicines',
  templateUrl: './request-for-medicines.component.html',
  styleUrls: ['./request-for-medicines.component.scss']
})
export class RequestForMedicinesComponent implements OnInit {

  public medicineInquires: MedicineInquiry[];
  public pharmacy: Pharmacy;

  displayedColumns = ['firstName', 'lastName', 'code', 'name'];

  constructor(private pharmacyService: PharmacyService, private authService: AuthenticationService, private medicineService: MedicineService) {
    this.pharmacyService.getPharmacyByFullPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.medicineService.getMedicineInquiriesForPharmacy(this.pharmacy.id).subscribe(
          data => {
            this.medicineInquires = data;
          }
        );
      }
    );
   }

  ngOnInit(): void {
  }

}
