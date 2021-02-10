import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { PharmacyMedicine } from '../../models/pharmacy-medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyMedicineService } from '../../services/medicines/pharmacy-medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-medicines-for-pharmacy',
  templateUrl: './medicines-for-pharmacy.component.html',
  styleUrls: ['./medicines-for-pharmacy.component.scss']
})
export class MedicinesForPharmacyComponent implements OnInit, AfterViewInit {

  public medicinesForPharmacy: PharmacyMedicine[];
  public pharmacy: Pharmacy;
  @Input() pharmacyId: number;

  displayedColumns = ['code', 'name', 'quantity'];

  constructor(private pharmacyService: PharmacyService, private medicineService: MedicineService, private pharmacyMedicineService: PharmacyMedicineService) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.pharmacyService.getPharmacyById(this.pharmacyId).subscribe(
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

}
