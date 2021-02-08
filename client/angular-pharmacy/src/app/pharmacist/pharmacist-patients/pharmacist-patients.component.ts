import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, _SnackBarContainer } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DermatologistExamination } from '../../models/dermatologist-examination.model';
import { Patient } from '../../models/patient.model';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';

@Component({
  selector: 'app-pharmacist-patients',
  templateUrl: './pharmacist-patients.component.html',
  styleUrls: ['./pharmacist-patients.component.scss']
})

export class PharmacistPatientsComponent implements OnInit, AfterViewInit {
  checked = false;
  indeterminate = false;
  public patientsForPharmacist : Patient[] = [];
  public counselingsHistory : DermatologistExamination[] = [];

  constructor(private pharmacistService : PharmacistService, private appointmentService : AppointmentService,
       private authenticationService : AuthenticationService, private snackBar : MatSnackBar) {
      this.pharmacistService.getPatientsForPharmacist(this.authenticationService.getLoggedUserId()).subscribe(
          data => {
            this.patientsForPharmacist = data;
            this.dataSource.data = this.patientsForPharmacist;
          },
          error => {
            if (error.status = 404){
              this.patientsForPharmacist = [];
              this.dataSource.data = this.patientsForPharmacist;
            }
          } 
      );
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'surname', 'email', 'phoneNumber', 'button'];
  dataSource = new MatTableDataSource(this.patientsForPharmacist);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getCounselingsHistory(patientId : number) : void {
    this.appointmentService.getCounselingsHistoryForPatient(patientId).subscribe(
      data => {
        this.counselingsHistory = data;
      },
      error => {
        if (error.status = 404){
          this.openSnackBar('Ne postoji istorija poseta za pacijenta', 'Zatvori');
          this.counselingsHistory = [];
        }
      }
   );
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

}
