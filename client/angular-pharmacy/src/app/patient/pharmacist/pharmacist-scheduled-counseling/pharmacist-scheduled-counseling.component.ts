import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DermatologistExamination } from '../../../models/dermatologist-examination.model';
import { AppointmentService } from '../../../services/schedule/appointment.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-pharmacist-scheduled-counseling',
  templateUrl: './pharmacist-scheduled-counseling.component.html',
  styleUrls: ['./pharmacist-scheduled-counseling.component.scss']
})
export class PharmacistScheduledCounselingComponent implements OnInit {

  checked = false;
  indeterminate = false;

  appointments: DermatologistExamination[] = [];
  displayedColumns: string[] = ['date', 'time', 'price', 'pharmacist', 'grade', 'scheduling'];
  dataSource = new MatTableDataSource(this.appointments);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private appointmentService: AppointmentService, private authenticationService: AuthenticationService) {
    this.appointmentService.getScheduledCounselingForPatient(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.appointments = data;
        this.dataSource.data = this.appointments;
      },
      error => {
        if (error.status == 404){
          this.dataSource.data = [];
          this.openSnackBar('Trenutno ne postoji nijedno zakazano savetovanje kod farmaceuta!', 'Zatvori', 3800);
        }
      }
    );
  }

  ngOnInit(): void {}

  cancelAppointmentClick(element): void {
    this.appointmentService.cancelExamination(element.id).subscribe(
      data => {
        this.openSnackBar('Savetovanje je uspešno otkazano!', 'Zatvori', 3000);
        this.appointmentService.getScheduledExaminationForPatient(this.authenticationService.getLoggedUserId()).subscribe(
          data => {
            this.appointments = data;
            this.dataSource.data = this.appointments;
          },
          error => {
            if (error.status == 404){
              this.dataSource.data = [];
              this.openSnackBar('Savetovanje je uspešno otkazano i trenutno ne postoji nijedno zakazano savetovanje kod farmaceuta!', 'Zatvori', 5000);
            }
          }
        );
      },
      error => {
        if (error.status = 406){
          this.openSnackBar('Savetovanje nije otkazano na vreme! Otkazivanje nije dozvoljeno!', 'Zatvori', 4000);
        } else {
          this.openSnackBar('Savetovanje trenutno nije moguće otkazati, molim Vas pokušajte ponovo!', 'Zatvori', 4000);
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
