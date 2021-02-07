import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { DermatologistExamination } from '../../../models/dermatologist-examination.model';
import { AppointmentService } from '../../../services/schedule/appointment.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-dermatologist-appointment-history',
  templateUrl: './dermatologist-appointment-history.component.html',
  styleUrls: ['./dermatologist-appointment-history.component.scss']
})
export class DermatologistAppointmentHistoryComponent implements OnInit, AfterViewInit {
  @ViewChild('t1Sort') t1Sort: MatSort;

  appointments: DermatologistExamination[] = [];
  displayedColumns: string[] = ['dateOfExamination', 'time', 'timePeriodOfExamination', 'price', 'dermatologistFullName', 'averageGrade'];
  dataSource = new MatTableDataSource(this.appointments);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService, private authenticationService: AuthenticationService) {
    this.appointmentService.getExaminationsHistoryForPatient(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.appointments = data;
        this.dataSource.data = this.appointments;
      },
      error => {
        if (error.status == 404){
          this.dataSource.data = [];
          this.openSnackBar('Trenutno ne postoji nijedan završen pregled kod dermatologa!', 'Zatvori', 3200);
        }
      }
    );
  }

  ngOnInit() {
    this.dataSource.sort = this.t1Sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.t1Sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'dateOfExamination': return moment(item.dateOfExamination, "DD-MM-YYYY").toDate();
        case 'timePeriodOfExamination': return Number(this.calcualteDuration(item.timePeriodOfExamination));
        case 'price': return Number(item.price);
        default: return item[property];
      }
    };
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  calcualteDuration(duration: String): String {
    var durationParts = duration.split('-');

    var startTime = moment(durationParts[0].trim(), 'hh:mm:ss a');
    var endTime = moment(durationParts[1].trim() , 'hh:mm:ss a');    
    return endTime.diff(startTime, 'minutes').toString();
  }

}