import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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
  selector: 'app-pharmacist-new-appointment',
  templateUrl: './pharmacist-new-appointment.component.html',
  styleUrls: ['./pharmacist-new-appointment.component.scss']
})

export class PharmacistNewAppointmentComponent implements OnInit {
  public patientsForPharmacist : Patient[] = [];
  public pharmacist : Pharmacist;
  public pharmacistPharmacy : Pharmacy = new Pharmacy(0, '', '', '', '', '', 0, '', 0);
  public selectedPatient : Patient;
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

  constructor(private appointmentService : AppointmentService, private pharmacyService : PharmacyService, private pharmacistService : PharmacistService, 
       private authenticationService : AuthenticationService, private workDayService : WorkDayService, private snackBar : MatSnackBar, public dialog: MatDialog) {
        this.getPatientsForPharmacist();
        this.getPharmacyForPharmacist();
  }

  ngOnInit(): void {
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
    if(this.chosenDate == '' || this.startTime == null || this.endTime == null || this.selectedPatient == null ) {
      this.openSnackBar('Moratate izabrati sve vrednosti kako bi zakazali savetovanje!', 'Zatvori', 3000);
      return;
    } else if(this.chosenDate != '' && this.startTime != null && this.endTime != null && this.selectedPatient == null ) {
      this.openSnackBar('Moratate selektovati pacijenta kako bi zakazali savetovanje!', 'Zatvori', 3000);
      return;
    } 
    const forrmatedReservationDate = this.chosenDate + ' ' + '00:00';
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;
    this.appointmentService.getAppointmentPrice(forrmatedReservationDate, forrmatedStartTime, forrmatedEndTime, this.pharmacistPharmacy.id.toString()).subscribe(
      data => {
        this.appointmentPrice = data;
    });
    this.workDayService.getWorkDayInPharmacyByDateAndEmployeeId(this.chosenDate, this.authenticationService.getLoggedUserId().toString(), this.pharmacistPharmacy.id.toString()).subscribe(
      data => {
        this.workDay = data; 
        this.newAppointmentTerm = new Appointment(0, 1, 1, new Date(forrmatedStartTime), new Date(forrmatedEndTime), this.selectedPatient[0], this.workDay, null, this.appointmentPrice); 
        this.appointmentService.scheduleExamination(this.newAppointmentTerm).subscribe(
          data => {
            this.openSnackBar('Uspešno ste zakazali novo savetovanje za pacijenta i obavestili ga putem e-mail pošte!', 'Zatvori', 4000);
            this.selectedPatient = null;
            //this.chosenDate = null;
            this.startTime = null;
            this.endTime = null;
          },
          error => {
            this.openSnackBar('Izabrani termin trenutno ne možete da zakažete ! MOGUĆI RAZLOZI: 1. Farmaceut ne radi u izabranom vremenu! 2. Pacijent ili farmaceut imaju zakazan termin u izabranom vremenu!', 'Zatvori', 6000);
          });     
      },
      error => {
        if (error.status == 404) {
          this.openSnackBar('Farmaceut ne radi u periodu u kom želite da zakažete savetovanje!', 'Zatvori', 3000);
        }
    });
    
  }

  getPatientsForPharmacist() : void {
    this.pharmacistService.getPatientsForPharmacist(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.patientsForPharmacist = data;
      }
   );
  }

  getPharmacyForPharmacist() : void {
    this.pharmacyService.getPharmacyByPharmacist(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacistPharmacy = data;
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

}
