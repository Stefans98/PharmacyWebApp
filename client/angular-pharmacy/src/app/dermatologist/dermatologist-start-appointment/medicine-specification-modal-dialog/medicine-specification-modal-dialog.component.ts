import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-medicine-specification-modal-dialog',
  templateUrl: './medicine-specification-modal-dialog.component.html',
  styleUrls: ['./medicine-specification-modal-dialog.component.scss']
})
export class MedicineSpecificationModalDialogComponent implements OnInit {

  benefits = new FormControl();
  public benefitList: string[];

  constructor() { 
    this.benefitList = ['Pogodnost 1', 'Pogodnost 2', 'Pogodnost 3', 'Pogodnost 4', 'Pogodnost 5'];
  }

  ngOnInit(): void {
    
  }

}
