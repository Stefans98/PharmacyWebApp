import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { WorkDay } from '../../models/work-day.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { WorkDayService } from '../../services/schedule/work-day.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
import { PatientService } from '../../services/users/patient.service';
import { PatientModalDialogComponent } from './patient-modal-dialog/patient-modal-dialog.component';

@Component({
  selector: 'app-dermatologist-new-appointment',
  templateUrl: './dermatologist-new-appointment.component.html',
  styleUrls: ['./dermatologist-new-appointment.component.scss']
})

export class DermatologistNewAppointmentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  checked = false;
  indeterminate = false;
  public patientsForDermatologist : Patient[] = [];
  public dermatologistPharmacies : Pharmacy[] = [];
  public selectedPatient : Patient;
  public selectedPharmacy : Pharmacy;
  public appointmentPrice : number;
  public newAppointmentTerm : Appointment;
  public workDay : WorkDay;
  selected = new FormControl(0);

  maxDate: Date = new Date();
  minTimeFinishing: string = '00:00';
  disabledTimeFinishing: boolean = true;
  time1: string = '00:00';
  time2: string = '00:00';

  chosenDate: string = '';
  startTime: string = '';
  endTime: string = '';

  public availableAppointments : Appointment[] = [];
  displayedColumns: string[] = ['dermatologist', 'pharmacy', 'date', 'time', 'button'];
  dataSource = new MatTableDataSource(this.availableAppointments);

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

  constructor(private dermatologistService : DermatologistService, private appointmentService : AppointmentService, private pharmacyService : PharmacyService,
       private authenticationService : AuthenticationService, private workDayService : WorkDayService, private patientService : PatientService , private snackBar : MatSnackBar, public dialog: MatDialog) {
        this.getPatientsForDermatologist();
        this.getAllAvailableExaminationTermsForDermatologist();
        this.getPharmaciesForDermatologist();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  scheduleNewAppointment() : void {
    if(this.chosenDate == '' || this.startTime == null || this.endTime == null || this.selectedPharmacy == null || this.selectedPatient == null ) {
      this.openSnackBar('Moratate izabrati sve vrednosti kako bi zakazali pregled!', 'Zatvori', 3000);
      return;
    } else if(this.chosenDate != '' && this.startTime != null && this.endTime != null && this.selectedPharmacy != null && this.selectedPatient == null ) {
      this.openSnackBar('Moratate selektovati pacijenta kako bi zakazali pregled!', 'Zatvori', 3000);
      return;
    } 
    const forrmatedReservationDate = this.chosenDate + ' ' + '00:00';
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;
    console.log(forrmatedEndTime);
    this.appointmentService.getAppointmentPrice(forrmatedReservationDate, forrmatedStartTime, forrmatedEndTime, this.selectedPharmacy.id.toString()).subscribe(
      data => {
        this.appointmentPrice = data;
    });
    this.workDayService.getWorkDayInPharmacyByDateAndEmployeeId(this.chosenDate, this.authenticationService.getLoggedUserId().toString(), this.selectedPharmacy.id.toString()).subscribe(
      data => {
        this.workDay = data; 
        this.newAppointmentTerm = new Appointment(0, 0, 1, new Date(forrmatedStartTime), new Date(forrmatedEndTime), this.selectedPatient[0], this.workDay, null, this.appointmentPrice); 
        this.appointmentService.scheduleExamination(this.newAppointmentTerm).subscribe(
          data => {
            this.openSnackBar('Uspešno ste zakazali novi pregled za pacijenta i obavestili ga o novom pregledu putem e-mail pošte!', 'Zatvori', 4200);
            this.selectedPatient = null;
            this.selectedPharmacy = null;
            this.chosenDate = null;
            this.startTime = null;
            this.endTime = null;
          },
          error => {
            this.openSnackBar('Izabrani termin trenutno ne možete da zakažete!', 'Zatvori', 3000);
        });     
      },
      error => {
        if (error.status == 404) {
          this.openSnackBar('Dermatolog ne radi u periodu u kom želite da zakažete pregled!', 'Zatvori', 3000);
        }
    });
    
  }

  getPatientsForDermatologist() : void {
    this.dermatologistService.getPatientsForDermatologist(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.patientsForDermatologist = data;
      }
   );
  }

  getAllAvailableExaminationTermsForDermatologist() : void {
    this.appointmentService.getAllAvailableExaminationTermsForDermatologist(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.availableAppointments = data;
        this.dataSource.data = this.availableAppointments;
      },
      error => {
        if (error.status == 404){
        }
      }
      );
  }

  getPharmaciesForDermatologist() : void {
    this.pharmacyService.getPharmaciesForDermatologist(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.dermatologistPharmacies = data;
      },
      error => {
        if (error.status == 404){
        }
      }
      );
  }

  showTimePeriod(appointment : Appointment): string {
    return this.convertTime(appointment.startTime) + ' - ' + this.convertTime(appointment.endTime);
  }

  convertDate(date : Date): string {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }

  convertTime(dateTime : Date): string {
    let d = new Date(dateTime);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    return (hours > 9 ? '' : '0') + hours + ":" + (minutes > 9 ? '' : '0') + minutes;
  }

  // TOAST
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openDialog(selectedAvailableAppointment : Appointment): void {
    const dialogRef = this.dialog.open(PatientModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '520px',
      height: '310px',
      position: {left: '650px'},
      data: { selectedAvailableAppointment : selectedAvailableAppointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.appointmentService.getAvailableExaminationTermsForDermatologist(this.authenticationService.getLoggedUserId(), selectedAvailableAppointment.workDay.pharmacy.id).subscribe(
        data => {
          this.availableAppointments = data;
          this.dataSource.data = this.availableAppointments;
        });
    });
  }

}
