import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-pharmacist-scheduling',
  templateUrl: './pharmacist-scheduling.component.html',
  styleUrls: ['./pharmacist-scheduling.component.scss']
})
export class PharmacistSchedulingComponent implements OnInit, AfterViewInit {
  maxDate: Date;
  minTimeFinishing: string = '00:00';
  disabledTimeFinishing: boolean = true;
  time1: string = '00:00';
  time2: string = '00:00';

  startTime: string = '';
  endTime: string = '';

  medicineId: number;
  pharmacyId: number;
  chosenDate: Date;
  searchedMedicine: string = '';
  //medicines: Medicine[] = [];
  pharmaciesWhichContainMedicine: Pharmacy[] = [];
  medicinePrice: DoubleRange;

  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  myTimePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#ffffff',
        buttonColor: '#5c6bc0'
    },
    dial: {
        dialBackgroundColor: '#5c6bc0',
    },
    clockFace: {
        clockFaceBackgroundColor: '#e8eaf6',
        clockHandColor: '#5c6bc0',
        clockFaceTimeInactiveColor: '#000000'
    }
  };

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  medicines: MedicineReservation[] = [];
  displayedColumns: string[] = ['name', 'city', 'grade', 'price', 'choice'];
  dataSource = new MatTableDataSource(this.medicines);
  displayedColumnsPharmacist: string[] = ['pharmacistName', 'pharmacistSurname', 'pharmacistGrade', 'scheduling'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private authenticationService: AuthenticationService,
    private medicineService: MedicineService, private pharmacyService: PharmacyService, public router: Router ) {
      this.medicineService.getAllReservedMedicinesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
        data => {
          this.medicines = data;
          this.dataSource.data = this.medicines;
        },
        error => {
          if (error.status == 404){
            this.openSnackBar('Trenutno ne postoji nijedan rezervisani lek!', 'Zatvori', 3200);
          }
        }
      );
    }
    
  @ViewChild('stepper') stepper: MatStepper;
    
  
  ngOnInit() {
    this.maxDate = new Date();

    this.firstFormGroup = this._formBuilder.group({
        datePicker: ['', Validators.required],
        timePicker1: ['', Validators.required],
        timePicker2: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
    });
  }
  
  selectedRowIndex = -1;

  highlight(row){
      this.selectedRowIndex = row.id;
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
    console.log(this.chosenDate)
  }

  startTimeChange(value) {
    this.startTime = value;
    this.minTimeFinishing = value;
    this.disabledTimeFinishing = false;
    console.log(this.startTime)
  }

  endTimeChange(value) {
    this.endTime = value;
    console.log(this.endTime)
  }

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate uneti potrebne podatke i izabrati jednu apoteku nakon toga!', 'Zatvori', 3700);
    } else {
      this.getPharmaciesByMedicineId(this.medicineId);
    }
  }

  secondNextButtonClicked(pharmacy) : void {
    console.log(pharmacy);
    this.stepper.next();
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
        this.openSnackBar('Neuspešna rezervacija leka!', 'Zatvori', 2500);
      });    
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
