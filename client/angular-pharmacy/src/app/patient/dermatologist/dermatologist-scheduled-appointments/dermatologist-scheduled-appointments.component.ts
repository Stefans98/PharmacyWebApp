import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DermatologistExamination } from '../../../models/dermatologist-examination.model';
import { AppointmentService } from '../../../services/schedule/appointment.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-dermatologist-scheduled-appointments',
  templateUrl: './dermatologist-scheduled-appointments.component.html',
  styleUrls: ['./dermatologist-scheduled-appointments.component.scss']
})
export class DermatologistScheduledAppointmentsComponent implements OnInit {

  checked = false;
  indeterminate = false;

  appointments: DermatologistExamination[] = [];
  displayedColumns: string[] = ['date', 'time', 'price', 'dermatologist', 'grade', 'scheduling'];
  dataSource = new MatTableDataSource(this.appointments);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService, private authenticationService: AuthenticationService) {
    this.appointmentService.getScheduledExaminationForPatient(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.appointments = data;
        this.dataSource.data = this.appointments;
      },
      error => {
        if (error.status == 404){
          this.dataSource.data = [];
          this.openSnackBar('Trenutno ne postoji nijedan zakazan pregled kod dermatloga!', 'Zatvori', 3200);
        }
      }
    );
  }

  ngOnInit(): void {}

  cancelAppointmentClick(element): void {
    this.appointmentService.cancelExamination(element.id).subscribe(
      data => {
        this.openSnackBar('Pregled je uspešno otkazan!', 'Zatvori', 3000);
        this.appointmentService.getScheduledExaminationForPatient(this.authenticationService.getLoggedUserId()).subscribe(
          data => {
            this.appointments = data;
            this.dataSource.data = this.appointments;
          },
          error => {
            if (error.status == 404){
              this.dataSource.data = [];
              this.openSnackBar('Pregled je uspešno otkazan i trenutno ne postoji nijedan zakazani pregled kod dermatologa!', 'Zatvori', 4700);
            }
          }
        );
      },
      error => {
        if (error.status = 406){
          this.openSnackBar('Pregled nije otkazan na vreme! Otkazivanje nije dozvoljeno!', 'Zatvori', 4000);
        } else {
          this.openSnackBar('Pregled trenutno nije moguće otkazati, molim Vas pokušajte ponovo!', 'Zatvori', 4000);
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

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }

}
