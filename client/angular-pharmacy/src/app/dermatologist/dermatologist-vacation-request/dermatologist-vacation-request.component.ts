import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dermatologist-vacation-request',
  templateUrl: './dermatologist-vacation-request.component.html',
  styleUrls: ['./dermatologist-vacation-request.component.scss']
})
export class DermatologistVacationRequestComponent implements OnInit {
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
