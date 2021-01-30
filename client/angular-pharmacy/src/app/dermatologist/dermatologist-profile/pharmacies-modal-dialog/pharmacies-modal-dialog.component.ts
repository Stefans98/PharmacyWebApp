import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pharmacies-modal-dialog',
  templateUrl: './pharmacies-modal-dialog.component.html',
  styleUrls: ['./pharmacies-modal-dialog.component.scss']
})
export class PharmaciesModalDialogComponent implements OnInit {

  pharmacies = new FormControl();
  public pharmaciesList: string[];

  constructor() { 
    this.pharmaciesList = ['Apoteka 1', 'Apoteka 2', 'Apoteka 3'];
  }

  ngOnInit(): void {
  }

}
