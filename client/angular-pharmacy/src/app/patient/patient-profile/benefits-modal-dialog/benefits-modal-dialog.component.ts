import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-benefits-modal-dialog',
  templateUrl: './benefits-modal-dialog.component.html',
  styleUrls: ['./benefits-modal-dialog.component.scss']
})
export class BenefitsModalDialogComponent implements OnInit {

  benefits = new FormControl();
  public benefitList: string[];

  constructor() { 
    this.benefitList = ['Pogodnost 1', 'Pogodnost 2', 'Pogodnost 3', 'Pogodnost 4', 'Pogodnost 5'];
  }

  ngOnInit(): void {
  }

}
