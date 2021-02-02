import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../../models/patient.model';
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

  checked = false;
  indeterminate = false;
  public patientsForDermatologist : Patient[] = [];

  constructor(private dermatologistService : DermatologistService, private appointmentService : AppointmentService,
       private authenticationService : AuthenticationService, private snackBar : MatSnackBar, public dialog: MatDialog) {
    this.dermatologistService.getPatientsForDermatologist(this.authenticationService.getLoggedUserId()).subscribe(
        data => {
          this.patientsForDermatologist = data;
          this.dataSource.data = this.patientsForDermatologist;
        }
     );
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['dermatologist', 'pharmacy', 'date', 'time', 'button'];
  dataSource = new MatTableDataSource(this.patientsForDermatologist);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // TOAST
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PatientModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '520px',
      height: '480px',
      position: {left: '650px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
