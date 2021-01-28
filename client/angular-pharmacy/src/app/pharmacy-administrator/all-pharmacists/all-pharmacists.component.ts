import { Component, OnInit } from '@angular/core';

export interface Pharmacists {
  name: string;
  lastname: string;
  email: string;
  address: string;
}

const ELEMENT_DATA: Pharmacists[] = [
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'},
  {name: 'Marko', lastname: 'Jovanovic', email: 'marko123@gmail.com', address: 'Cara Dusana 2'}
];

@Component({
  selector: 'app-all-pharmacists',
  templateUrl: './all-pharmacists.component.html',
  styleUrls: ['./all-pharmacists.component.scss']
})
export class AllPharmacistsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'email', 'address', 'remove'];
  dataSource = ELEMENT_DATA;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
