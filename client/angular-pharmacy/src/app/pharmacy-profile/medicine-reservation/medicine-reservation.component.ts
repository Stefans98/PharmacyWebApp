import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Medicine } from '../../models/medicine.model';
import { MedicineReservation } from '../../models/medicineReservation.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-medicine-reservation',
  templateUrl: './medicine-reservation.component.html',
  styleUrls: ['./medicine-reservation.component.scss']
})
export class MedicineReservationComponent implements OnInit {
  maxDate: Date;
  medicineId: number;
  chosenDate: Date;
  searchedMedicine: string = '';
  medicines: Medicine[] = [];
  pharmaciesWhichContainMedicine: Pharmacy[] = [];
  medicinePrice: DoubleRange;

  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() pharmacyId: number;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isLinear = true;
  firstFormGroup: FormGroup;
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
    this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
    });
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
        this.openSnackBar('Lek je uspešno rezervisan! Rezervaciju možete otkazati ukoliko do datuma preuzimanja ima više od 24h! Ukoliko ne preuzmete lek na vreme dobijate 1 penal!', 'Zatvori', 5700);
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Ne možete izvršiti rezervaciju leka, jer na stanju nema izabranog leka ili imate više od 2 penala za ovaj mesec!', 'Zatvori', 4700);
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
      this.medicineService.findMedicinesByNameAndPharmacyId(this.searchedMedicine.toLowerCase(), this.pharmacyId).subscribe(
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
