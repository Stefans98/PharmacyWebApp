import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MedicineSpecificationModalDialogComponent } from './medicine-specification-modal-dialog/medicine-specification-modal-dialog.component';
import { Patient } from '../../models/patient.model';

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

    displayedAppointmentColumns: string[] = ['name', 'surname', 'email', 'pharmacy', 'date', 'time'];
    dataSourceAppointments = new MatTableDataSource(ELEMENT_DATAA);
    displayedColumns: string[] = ['name', 'manufacturer', 'type', 'specification', 'prescribe'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.fourthFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
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

  findPatient(): void {
    this.patientFlag = true;
  }

  openDialog(): void {
    this.dialog.open(MedicineSpecificationModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '400px',
      height: '220px',
      position: {left: '650px'}
    });

  }

}
