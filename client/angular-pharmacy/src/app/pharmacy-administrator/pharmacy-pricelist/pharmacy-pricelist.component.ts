import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppointmentPrice } from '../../models/appointment-price.model';
import { MedicinePrice } from '../../models/medicine-price.model';
import { PharmacyMedicine } from '../../models/pharmacy-medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { Pricelist } from '../../models/pricelist.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyMedicineService } from '../../services/medicines/pharmacy-medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { PricelistService } from '../../services/pharmacy/pricelist.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-pharmacy-pricelist',
  templateUrl: './pharmacy-pricelist.component.html',
  styleUrls: ['./pharmacy-pricelist.component.scss']
})
export class PharmacyPricelistComponent implements OnInit {

  public pricelist: Pricelist;
  public medicinePrices: MedicinePrice[];
  public appointmentPrices: AppointmentPrice[];
  public pharmacy: Pharmacy;
  public minDate: Date;
  public startDate: Date;
  public endDate: Date;

  public medicinesForPharmacy: PharmacyMedicine[];

  displayedColumns = ['code', 'name', 'quantity', 'delete'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacyService: PharmacyService, private authService: AuthenticationService, private medicineService: MedicineService, 
    private pharmacyMedicineService: PharmacyMedicineService, private pricelistService: PricelistService) {
      this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
        data => {
          this.pharmacy = data;
          this.pricelistService.getPricelistForPharmacy(this.pharmacy.id).subscribe(
            data => {
              this.pricelist = data;
              this.medicinePrices = this.pricelist.medicinePrices;
              this.appointmentPrices = this.pricelist.appointmentPrices;
            }
          );
        }
      );

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

      this.minDate = new Date();
      //this.startDate = new Date();
      //this.endDate = new Date();
    }

  ngOnInit(): void {
  }

  convertType(appointmentType){
    if(appointmentType == 0){
      return 'PREGLED';
    }else if(appointmentType == 1){
      return 'SAVETOVANJE';
    }
  }

  add(medicinePharmacy){
    for(var medPrice of this.medicinePrices){
      if(medPrice.medicine.code == medicinePharmacy.medicine.code){
        this.openSnackBar('Lek je vec dodat u cenovnik!', 'Zatvori');
        return;
      }
    }
    this.medicinePrices.push(new MedicinePrice(null, 0, new Date(), new Date, medicinePharmacy.medicine));
  }

  definePricelist(startDate, endDate){
    if(startDate > endDate){
      this.openSnackBar('Datum početka mora biti pre datuma kraja!', 'Zatvori');
      return;
    }
    var medPrices: MedicinePrice[] = [];
    for(var medPrice of this.medicinePrices){
      medPrice.startTime = this.startDate;
      medPrice.endTime = this.endDate;
      medPrices.push(medPrice);
    }
    var appPrices: AppointmentPrice[] = [];
    for(var appPrice of this.appointmentPrices){
      appPrice.startTime = this.startDate;
      appPrice.endTime = this.endDate;
      appPrices.push(appPrice);
    }
    this.pricelist.medicinePrices = medPrices;
    this.pricelist.appointmentPrices = appPrices;
    this.pricelistService.updatePricelist(this.pricelist).subscribe(
      data => {
        this.openSnackBar('Uspešno ste definisali/izmenili cenovnik!', 'Zatvori');
      },
      error => {
        if(error.status == 400){
          this.openSnackBar('Neuspešno definisanje/izmena cenovnika!', 'Zatvori');
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
