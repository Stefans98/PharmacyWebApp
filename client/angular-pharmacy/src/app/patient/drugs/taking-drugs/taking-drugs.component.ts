import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Medicine } from '../../../models/medicine.model';
import { MedicineReservation } from '../../../models/medicineReservation.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-taking-drugs',
  templateUrl: './taking-drugs.component.html',
  styleUrls: ['./taking-drugs.component.scss']
})
export class TakingDrugsComponent implements OnInit {
  maxDate: Date;
  medicineId: number;
  pharmacyId: number;
  chosenDate: Date;
  searchedMedicine: string = '';
  medicines: Medicine[] = [];
  pharmaciesWhichContainMedicine: Pharmacy[] = [];
  medicinePrice: DoubleRange;

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private authenticationService: AuthenticationService,
    private medicineService: MedicineService, private pharmacyService: PharmacyService, public router: Router ) {}

  ngOnInit() {
    this.maxDate = new Date();

    this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
    });
  }

  onChangePharmacy(pharmacyId)  {
    this.pharmacyId = pharmacyId[0];
  }

  onChangeMedicine(medicine) {
    this.medicineId = medicine[0];
  }

  onDateChange(chosenDate) {
    const _ = moment();
    const date = moment(chosenDate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
    this.chosenDate = date.toDate();
  }

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate pretražiti i zatim selektovati jedan od ponuđenih lekova!', 'Zatvori', 3000);
    } else {
      this.getPharmaciesByMedicineId(this.medicineId);
    }
  }

  secondNextButtonClicked() : void {
    if (!this.secondFormGroup.valid) {
      this.openSnackBar('Morate selektovati apoteku!', 'Zatvori', 2500);
    }
  }

  thirdNextButtonClicked() : void {
    if (!this.thirdFormGroup.valid) {
      this.openSnackBar('Morate izabrati datum!', 'Zatvori', 2500);
    } else {
      this.getMedicinePrice(this.medicineId, this.pharmacyId);
    }
  }

  reserveMedicineClick() : void {
    this.medicineService.reserveMedicine(new MedicineReservation(0, this.chosenDate, false, this.medicineId, this.pharmacyId, this.authenticationService.getLoggedUserId(), null, null, 0.0)) 
      .subscribe( data => {
        this.router.navigate(['/auth/patient/drugs/reserved-drugs']);
        this.openSnackBar('Lek je uspešno rezervisan! Rezervaciju možete otkazati ukoliko do datuma preuzimanja ima više od 24h!', 'Zatvori', 4500);
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Na stanju izabrane apoteke trenutno nema željenog leka.', 'Zatvori', 3300);
        } else {
          this.openSnackBar('Neuspešna rezervacija leka!', 'Zatvori', 2500);
        }
      });    
  }
  
  findMedicine() : void {
    this.medicines = [];
    this.searchedMedicine = this.searchInput.nativeElement.value
    if (this.searchedMedicine === ''){
      this.openSnackBar('Morate uneti parametar pretrage!', 'Zatvori', 2500);
    } else {
      this.medicineService.findMedicinesBy(this.searchedMedicine.toLowerCase()).subscribe(
        data => {
          this.medicines = data;
        },
        error => {
          if (error.status == 404){
            this.openSnackBar('Ne postoji lek za uneti parametar pretrage!', 'Zatvori', 3000);
          }
        }
      );
    }
  }

  getPharmaciesByMedicineId(id: number) : void {
    this.pharmaciesWhichContainMedicine = [];
    this.pharmacyService.getPharmaciesByMedicineId(id).subscribe(
      data => {
        this.pharmaciesWhichContainMedicine = data;
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Ne postoje apoteke koje sadrže selektovani lek!', 'Zatvori', 3000);
        }
      }
    );
  }

  getMedicinePrice(medicineId: number, pharmacyId: number) {
    this.medicineService.getMedicinePrice(medicineId.toString(), pharmacyId.toString()).subscribe(
      data => {
        this.medicinePrice = data;
      },
      error => {
        this.openSnackBar('Cena trenutno nije dostupna!', 'Zatvori', 2500);
      }
    )
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
