import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, _SnackBarContainer } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DermatologistExamination } from '../../models/dermatologist-examination.model';
import { Patient } from '../../models/patient.model';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';

@Component({
  selector: 'app-dermatologist-patients',
  templateUrl: './dermatologist-patients.component.html',
  styleUrls: ['./dermatologist-patients.component.scss']
})

export class DermatologistPatientsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  checked = false;
  indeterminate = false;

  dataSourceChangeIn = 1;
  searchInputLenght = 0;

  public patientsForDermatologist : Patient[] = [];
  public examinationsHistory : DermatologistExamination[] = [];

  displayedColumns: string[] = ['name', 'surname', 'email', 'phoneNumber', 'button'];
  dataSource = new MatTableDataSource(this.patientsForDermatologist);
  newDataSource = new MatTableDataSource(this.patientsForDermatologist);
  dataSourceAfterSearch = new MatTableDataSource(this.patientsForDermatologist);

  constructor(private dermatologistService : DermatologistService, private appointmentService : AppointmentService,
       private authenticationService : AuthenticationService, private snackBar : MatSnackBar) {
    this.dermatologistService.getPatientsForDermatologist(this.authenticationService.getLoggedUserId()).subscribe(
        data => {
          this.patientsForDermatologist = data;
          this.dataSource.data = this.patientsForDermatologist;
        },
        error => {
          if (error.status = 404){
            this.patientsForDermatologist = [];
            this.dataSource.data = this.patientsForDermatologist;
          }
        } 
     );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setFilterPredict() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (this.dataSourceChangeIn == 1) {
        return data.firstName.toLowerCase().startsWith(filter) || data.lastName.toLowerCase().startsWith(filter);
      }   
    };
  }

  applySearch(event: Event) {


    this.dataSource = new MatTableDataSource(this.patientsForDermatologist);
    this.setFilterPredict();
    this.dataSourceChangeIn = 1;
    const filter = (event.target as HTMLInputElement).value
    this.searchInputLenght = filter.length;
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSourceAfterSearch = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSource.sort = this.sort;
  }


  getExaminationsHistory(patientId : number) : void {
    this.appointmentService.getExaminationsHistoryForPatient(patientId).subscribe(
      data => {
        this.examinationsHistory = data;
      },
      error => {
        if (error.status = 404){
          this.openSnackBar('Ne postoji istorija poseta za pacijenta', 'Zatvori');
          this.examinationsHistory = [];
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
