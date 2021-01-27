import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Aca', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Jovin', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Milan', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
  {name: 'Petar', surname: 'Petrović', email: 'petar@gmail.com', phoneNumber: '+38160710082'},
];

@Component({
  selector: 'app-dermatologist-patients',
  templateUrl: './dermatologist-patients.component.html',
  styleUrls: ['./dermatologist-patients.component.scss']
})
export class DermatologistPatientsComponent implements OnInit, AfterViewInit {

  checked = false;
  indeterminate = false;
  constructor() { }

  ngOnInit(): void {
  }


  displayedColumns: string[] = ['name', 'surname', 'email', 'phoneNumber', 'button'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
