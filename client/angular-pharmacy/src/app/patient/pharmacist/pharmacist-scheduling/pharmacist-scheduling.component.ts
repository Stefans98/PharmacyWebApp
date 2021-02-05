import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pharmacy } from '../../../models/pharmacy.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { PharmacistService } from '../../../services/users/pharmacist.service';
import { Pharmacist } from '../../../models/pharmacist.model';

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

  chosenDate: string = '';
  startTime: string = '';
  endTime: string = '';

  availablePharmacies: Pharmacy[] = [];
  dataSourcePharmacies = new MatTableDataSource(this.availablePharmacies);

  availablePharmacists: Pharmacist[] = [];
  dataSourcePharmacists = new MatTableDataSource(this.availablePharmacists);

  displayedColumns: string[] = ['name', 'city', 'grade', 'price', 'choice'];
  displayedColumnsPharmacist: string[] = ['pharmacistName', 'pharmacistSurname', 'pharmacistGrade', 'scheduling'];

  selectedRowIndex = -1;

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

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

  ngAfterViewInit() {}
  
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private authenticationService: AuthenticationService,
    private pharmacistService: PharmacistService, private pharmacyService: PharmacyService, public router: Router ) {
      this.dataSourcePharmacies.sort = this.sort;
      this.dataSourcePharmacists.sort = this.sort;
  }
    
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
    });
  }

  highlight(row){
      this.selectedRowIndex = row.id;
  }

  onDateChange(chosenDate) {
    const _ = moment();
    this.chosenDate = moment(chosenDate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()}).format('YYYY-MM-DD HH:mm')
  }

  onStartTimeChange(value) {
    this.startTime = value;
    this.minTimeFinishing = value;
    this.disabledTimeFinishing = false;
  }

  onEndTimeChange(value) {
    this.endTime = value;
  }

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate uneti potrebne podatke i izabrati jednu apoteku nakon toga!', 'Zatvori', 3700);
    } else {
      this.getPharmaciesWithAvailablePharmacistsByDateTime(this.chosenDate, this.startTime, this.endTime);
    }
  }

  secondNextButtonClicked(pharmacy) : void {
    this.getAvailablePharmacistsForPharmacy(this.chosenDate, this.startTime, this.endTime, pharmacy.id);
    this.stepper.next();
  }

  scheduleClicked() : void {

  }

  getPharmaciesWithAvailablePharmacistsByDateTime(reservationDate: string, startTime: string, endTime: string) : void {
    const _ = moment();
    const date = moment(reservationDate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()}).format('YYYY-MM-DD');
    const forrmatedStartTime = date + ' ' + startTime;
    const forrmatedEndTime = date + ' ' + endTime;

    this.pharmacyService.getPharmaciesWithAvailablePharmacistsByDateTime(reservationDate, forrmatedStartTime, forrmatedEndTime).subscribe(
      data => {
        this.availablePharmacies = data;
        this.dataSourcePharmacies.data = this.availablePharmacies;
      },
      error => {
        if (error.status == 404){
          this.dataSourcePharmacies.data = [];
          this.openSnackBar('Ne postoje slobodne apoteke za izabrani datum i vreme savetovanja!', 'Zatvori', 4000);
        }
      }
    );
  }

  getAvailablePharmacistsForPharmacy(reservationDate: string, startTime: string, endTime: string, pharmacyId: string) : void {
    const _ = moment();
    const date = moment(reservationDate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()}).format('YYYY-MM-DD');
    const forrmatedStartTime = date + ' ' + startTime;
    const forrmatedEndTime = date + ' ' + endTime;

    this.pharmacistService.getAvailablePharmacistsForPharmacy(reservationDate, forrmatedStartTime, forrmatedEndTime, pharmacyId).subscribe(
      data => {
        this.availablePharmacists = data;
        this.dataSourcePharmacists.data = this.availablePharmacists;
      },
      error => {
        if (error.status == 404){
          this.dataSourcePharmacists.data = [];
          this.openSnackBar('Ne postoje slobodni farmaceuti za izabrani datum, vreme i apoteku!', 'Zatvori', 4300);
        }
      }
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
