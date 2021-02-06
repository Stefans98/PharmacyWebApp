import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Appointment } from '../../../models/appointment.model';
import { Patient } from '../../../models/patient.model';
import { AppointmentService } from '../../../services/schedule/appointment.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { DermatologistService } from '../../../services/users/dermatologist.service';

@Component({
  selector: 'app-patient-modal-dialog',
  templateUrl: './patient-modal-dialog.component.html',
  styleUrls: ['./patient-modal-dialog.component.scss']
})
export class PatientModalDialogComponent implements OnInit {

  @ViewChild(MatSelectionList) patientsList: MatSelectionList;
  public patientsForDermatologist : Patient[] = [];
  public selectedPatient : Patient;

  constructor(private dermatologistService : DermatologistService, private appointmentService : AppointmentService,
    private authenticationService : AuthenticationService, private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<PatientModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedAvailableAppointmentData: { selectedAvailableAppointment : Appointment }) {
      this.dermatologistService.getPatientsForDermatologist(this.authenticationService.getLoggedUserId()).subscribe(
        data => {
          this.patientsForDermatologist = data;
        }
      );
   }

   scheduleAppointment() : void {
     if(this.selectedPatient == null) {
      this.openSnackBar('Morate selektovati pacijenta da bi zakazali pregled!', 'Zatvori', 3000);
      return;
     } else {
        this.appointmentService.scheduleExamination(this.selectedAvailableAppointmentData.selectedAvailableAppointment).subscribe(
          data => {
            this.openSnackBar('Uspešno ste zakazali nov termin za pacijenta!', 'Zatvori', 3000);          
          },
          error => {
            this.openSnackBar('Zakazivanje izabranog termina trenutno nije moguće!', 'Zatvori', 3000);
          });
          this.dialogRef.close();
     }
   }

  ngOnInit(): void {
    // this.patientsList.selectionChange.subscribe((s: MatSelectionListChange) => {          
    //   this.patientsList.deselectAll();
    //   s.option.selected = true;
    // });
  }

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
