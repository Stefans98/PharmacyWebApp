import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
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
  selected = new FormControl(0);

  public availableAppointments : Appointment[] = [];
  displayedColumns: string[] = ['dermatologist', 'pharmacy', 'date', 'time', 'button'];
  dataSource = new MatTableDataSource(this.availableAppointments);

  constructor(private dermatologistService : DermatologistService, private appointmentService : AppointmentService, private pharmacyService : PharmacyService,
       private authenticationService : AuthenticationService, private snackBar : MatSnackBar, public dialog: MatDialog) {
        this.getPatientsForDermatologist();
        this.getAllAvailableExaminationTermsForDermatologist();
        this.getPharmaciesForDermatologist();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  scheduleNewAppointment() : void {
    if(this.selectedPatient == null) {
      this.openSnackBar('Morate selektovati pacijenta da bi zakazali pregled2!', 'Zatvori', 3000);
      return;
    } else {
      // Zakazivanje novog sa izborom datuma
    }
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
