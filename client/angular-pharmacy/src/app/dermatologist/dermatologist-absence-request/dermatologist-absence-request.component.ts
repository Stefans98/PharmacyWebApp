import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dermatologist-absence-request',
  templateUrl: './dermatologist-absence-request.component.html',
  styleUrls: ['./dermatologist-absence-request.component.scss']
})
export class DermatologistAbsenceRequestComponent implements OnInit {
  campaignOne: FormGroup;
  
  constructor() {
    const today = new Date();
    const day = today.getDay()
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day))
    });
   }

  ngOnInit(): void {
  }

}
