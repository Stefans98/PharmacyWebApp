import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';
import { Pharmacist } from '../../models/pharmacist.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { WorkDay } from '../../models/work-day.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { WorkDayService } from '../../services/schedule/work-day.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';

@Component({
  selector: 'app-counseling-scheduling',
  templateUrl: './counseling-scheduling.component.html',
  styleUrls: ['./counseling-scheduling.component.scss']
})
export class CounselingSchedulingComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('t1Sort') t1Sort: MatSort;
  @ViewChild('t2Sort') t2Sort: MatSort;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  maxDate: Date;
  minTimeFinishing: string = '00:00';
  disabledTimeFinishing: boolean = true;
  time1: string = '00:00';
  time2: string = '00:00';

  chosenDate: string = '';
  startTime: string = '';
  endTime: string = '';
  appointment: Appointment;
  workDay: WorkDay;
  price: number = 0.0;
  @Input() pharmacyId: number;

  availablePharmacies: Pharmacy[] = [];
  dataSourcePharmacies = new MatTableDataSource(this.availablePharmacies);

  availablePharmacists: Pharmacist[] = [];
  dataSourcePharmacists = new MatTableDataSource(this.availablePharmacists);

  displayedColumns: string[] = ['name', 'city', 'averageGrade', 'price', 'choice'];
  displayedColumnsPharmacist: string[] = ['pharmacistName', 'pharmacistSurname', 'averageGrade', 'scheduling'];

  selectedRowIndex = -1;

  isLinear = true;
  firstFormGroup: FormGroup;
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
  
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private authenticationService: AuthenticationService, private workDayService: WorkDayService,
    private pharmacistService: PharmacistService, private pharmacyService: PharmacyService, public router: Router, private appointmentService: AppointmentService) {
  }
    
  ngOnInit() {
    this.dataSourcePharmacies.sort = this.t1Sort;
    this.dataSourcePharmacists.sort = this.t2Sort;
    this.maxDate = new Date();

    this.firstFormGroup = this._formBuilder.group({
        datePicker: ['', Validators.required],
        timePicker1: ['', Validators.required],
        timePicker2: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
    });
  }

  highlight(row){
      this.selectedRowIndex = row.id;
  }

  onDateChange(chosenDate) {
    this.chosenDate = moment(chosenDate).format('YYYY-MM-DD')
  }

  onStartTimeChange(value) {
    this.startTime = value;
    this.endTime = this.startTime;
    this.minTimeFinishing = value;
    this.disabledTimeFinishing = false;
  }

  onEndTimeChange(value) {
    this.endTime = value;
  }

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate uneti potrebne podatke!', 'Zatvori', 3700);
    } else {
      this.getAvailablePharmacistsForPharmacy(this.chosenDate, this.startTime, this.endTime, this.pharmacyId.toString());
      this.price = 300; //pharmacy.price;
    }
  }

  getAvailablePharmacistsForPharmacy(reservationDate: string, startTime: string, endTime: string, pharmacyId: string) : void {
    const forrmatedReservationDate = reservationDate + ' ' + '00:00';
    const forrmatedStartTime = reservationDate + ' ' + startTime;
    const forrmatedEndTime = reservationDate + ' ' + endTime;

    this.pharmacistService.getAvailablePharmacistsForPharmacy(forrmatedReservationDate, forrmatedStartTime, forrmatedEndTime, pharmacyId).subscribe(
      data => {
        this.availablePharmacists = data;
        this.dataSourcePharmacists.data = this.availablePharmacists;
        this.dataSourcePharmacists.sort = this.t2Sort;
      },
      error => {
        if (error.status == 404){
          this.dataSourcePharmacists.data = [];
          this.openSnackBar('Ne postoje slobodni farmaceuti za izabrani datum i vreme u ovoj apoteci!', 'Zatvori', 4300);
        }
      }
    );
  }

  scheduleClicked(pharmacist) : void {
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;

    this.workDayService.getWorkDayInPharmacyByDateAndEmployeeId(this.chosenDate, pharmacist.id, this.pharmacyId.toString()).subscribe(
      data => {
        this.workDay = data;
        var patientId = this.authenticationService.getLoggedUserId();
        this.appointment = new Appointment(0, 1, 1, new Date(forrmatedStartTime), new Date(forrmatedEndTime), new Patient(patientId, '', '', '', '', '', '', '', 0, 1, '', null), this.workDay, null, this.price); 
        this.appointmentService.scheduleExamination(this.appointment).subscribe(
          data => {
            this.router.navigate(['/auth/patient/pharmacist/pharmacist-scheduled-counseling']);
            this.openSnackBar('Na Vašem email-u možete pogledati potvrdu o zakazivanju pregleda! Pregled možete otkazati ukoliko do datuma pregleda ima više od 24h!', 'Zatvori', 5600);
          },
          error => {
            this.openSnackBar('Nemate pravo zakazivanja termina kod farmaceuta zato što ste imali ili trenutno imate zakazan termin koji se preklapa sa izabranim datumom i vremenom ili je broj Vaših penala za ovaj mesec preko 2!', 'Zatvori', 8300);
          });
      },
      error => {
        if (error.status == 404) {
          this.openSnackBar('Farmaceut ne radi u apoteci!', 'Zatvori', 4300);
        }
      });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
