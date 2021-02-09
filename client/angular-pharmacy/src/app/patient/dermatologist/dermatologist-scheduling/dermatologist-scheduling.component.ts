import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/schedule/appointment.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-dermatologist-scheduling',
  templateUrl: './dermatologist-scheduling.component.html',
  styleUrls: ['./dermatologist-scheduling.component.scss']
})
export class DermatologistSchedulingComponent implements OnInit, AfterViewInit {
  @ViewChild('t1Sort') t1Sort: MatSort;
  checked = false;
  indeterminate = false;

  appointments: Appointment[] = [];
  displayedColumns: string[] = ['date', 'time', 'price', 'dermatologist', 'averageGrade', 'scheduling'];
  dataSource = new MatTableDataSource(this.appointments);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  @Input() pharmacyId: number;

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.t1Sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'averageGrade': return Number(item.workDay.employee.averageGrade);
        case 'price': return Number(item.price);
        default: return item[property];
      }
    };
    this.appointmentService.getAvailableExaminationTermsForPharmacy(this.pharmacyId).subscribe(
      data => {
        this.appointments = data;
        this.dataSource.data = this.appointments;
      }
    );
  }

  scheduleAppointmentClick(appointment): void {
    appointment.patient.id = this.authenticationService.getLoggedUserId();
    this.appointmentService.scheduleExamination(appointment).subscribe(
      data => {
        this.openSnackBar('Na Vašem email-u možete pogledati potvrdu o zakazivanju pregleda! Pregled možete otkazati ukoliko do datuma pregleda ima više od 24h!', 'Zatvori', 5600);
        this.appointmentService.getAvailableExaminationTermsForPharmacy(this.pharmacyId).subscribe(
          data => {
            this.appointments = data;
            this.dataSource.data = this.appointments;
          },
          error => {
            if (error.status == 404){
              this.dataSource.data = [];
            }
          }
        );
      },
      error => {
        this.openSnackBar('Nemate pravo zakazivanja termina kod dermatologa zato što ste imali ili trenutno imate zakazan termin koji se preklapa sa izabranim datumom i vremenom ili je broj Vaših penala za ovaj mesec preko 2!', 'Zatvori', 8400);
      });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
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
}
