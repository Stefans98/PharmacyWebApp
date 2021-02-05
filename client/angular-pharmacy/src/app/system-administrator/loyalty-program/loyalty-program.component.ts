import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loyalty-program',
  templateUrl: './loyalty-program.component.html',
  styleUrls: ['./loyalty-program.component.scss']
})
export class LoyaltyProgramComponent implements OnInit {

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
    showOuterSelectionBars: true
  };

  regularUserDiscount: number = 0;
  silverUserDiscount: number = 0;
  goldUserDiscount: number = 0;

  examinationPoints: number;
  counselingPoints: number;

  constructor() { }

  ngOnInit(): void {
  }

}
