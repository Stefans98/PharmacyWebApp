import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MedicineSpecificationModalDialogComponent } from './medicine-specification-modal-dialog/medicine-specification-modal-dialog.component';
import { Patient } from '../../models/patient.model';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
}

export interface Proba {
  name: string;
  surname: string;
  email: string;
  pharmacy: string;
  date: string;
  time: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
  {position: 4, name: 'Beryllium'},
  {position: 5, name: 'Boron'},
  {position: 6, name: 'Carbon'},
  {position: 7, name: 'Nitrogen'},
  {position: 8, name: 'Oxygen'},
  {position: 9, name: 'Fluorine'},
  {position: 10, name: 'Neon'},
];

const ELEMENT_DATAA: Proba[] = [
  {name: 'Pera', surname: 'Petrovic', email :'patient1@gmail.com', pharmacy : 'Jankovic apoteka', date : '02.02.2020.', time : '10:00-10:30'},
  {name: 'Pera', surname: 'Petrovic', email :'patient1@gmail.com', pharmacy : 'Jankovic apoteka', date : '02.02.2020.', time : '10:00-10:30'},
  {name: 'Pera', surname: 'Petrovic', email :'patient1@gmail.com', pharmacy : 'Jankovic apoteka', date : '02.02.2020.', time : '10:00-10:30'},
  {name: 'Pera', surname: 'Petrovic', email :'patient1@gmail.com', pharmacy : 'Jankovic apoteka', date : '02.02.2020.', time : '10:00-10:30'},
];

@Component({
  selector: 'app-dermatologist-start-appointment',
  templateUrl: './dermatologist-start-appointment.component.html',
  styleUrls: ['./dermatologist-start-appointment.component.scss']
})

export class DermatologistStartAppointmentComponent implements OnInit {
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild(MatAccordion) accordion: MatAccordion;
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;
    patients: string[] = ['Petar Petrovic', 'Jovan Jovic',];
    medicines = new FormControl();
    public medicineList: string[] = ['Brufen', 'Paracetamol'];
    public patientFlag: Boolean = false;
    public patientTerms : Proba[] = [];
    public patientAppointments : Appointment[] = [];
    public selectedAppointment : Appointment;
    

    displayedAppointmentColumns: string[] = ['name', 'surname', 'email', 'pharmacy', 'date', 'time'];
    dataSourceAppointments = new MatTableDataSource(ELEMENT_DATAA);
    displayedColumns: string[] = ['name', 'manufacturer', 'type', 'specification', 'prescribe'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private appointmentService : AppointmentService, private authenticationService : AuthenticationService,
       private _formBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });
        this.fourthFormGroup = this._formBuilder.group({
            fourthCtrl: ['', Validators.required]
        });
    }

    onChange(change: MatSelectionListChange) {
        console.log(change.option.value, change.option.selected);
    }

    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onChangeAppointment(appointment) {
    this.selectedAppointment = appointment[0];
  }

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate selektovati pregled da bi ga započeli!', 'Zatvori', 3000);
    } 
  }

  findPatientAppointments(): void {
    this.patientAppointments = [];
    if(this.searchInput.nativeElement.value == '') {
      this.openSnackBar('Morate popuniti polje za pretragu!', 'Zatvori', 3000);
      this.patientFlag = false;
      return;
    }
    this.appointmentService.getOccupiedAppointmentsByPatientEmail(this.searchInput.nativeElement.value, this.authenticationService.getLoggedUserId().toString()).subscribe(
      data => {
        this.patientAppointments = data;
        this.patientFlag = true;
      },
      error => {
        if (error.status == 400){
          this.patientFlag = false;
          this.openSnackBar('Ne postoji pacijenta sa e-mail adresom koju ste uneli!', 'Zatvori', 3000);
        }
        if (error.status == 404){
          this.patientFlag = false;
          this.openSnackBar('Ne postoje pregledi za pacijenta kog ste pronašli!', 'Zatvori', 3000);
        }
      }
    )
  }

  patientNotHeldOnAppointment() : void {
    if(this.selectedAppointment == null) {
      this.openSnackBar('Morate selektovati pregled pacijenta!', 'Zatvori', 3000);
      return;
    }
    this.appointmentService.patientNotHeldOnAppointment(this.selectedAppointment).subscribe(
      data => {
        this.patientFlag = false;
        this.selectedAppointment = null;
        this.patientAppointments = [];
        this.searchInput.nativeElement.value = '';
        this.openSnackBar('Uspešno ste završili pregled!', 'Zatvori', 3000);
      },
      error => {
        if (error.status = 404){
          this.openSnackBar('Neuspešan završetak pregleda!', 'Zatvori', 3000);
        } 
      });
  }

  displayAppointmentRow(appointment : Appointment): string {
    return appointment.workDay.pharmacy.name + ', ' + this.convertDate(appointment.startTime) + ' ' + this.convertTime(appointment.startTime) + ' - ' + this.convertTime(appointment.endTime) + ', '
      + appointment.patient.firstName + ' ' + appointment.patient.lastName + ', ' + appointment.patient.email;
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

  openDialog(): void {
    this.dialog.open(MedicineSpecificationModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '400px',
      height: '220px',
      position: {left: '650px'}
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
