import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-patient-modal-dialog',
  templateUrl: './patient-modal-dialog.component.html',
  styleUrls: ['./patient-modal-dialog.component.scss']
})
export class PatientModalDialogComponent implements OnInit {

  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  @ViewChild(MatSelectionList) shoes: MatSelectionList;

  constructor() { }

  ngOnInit(): void {
    this.shoes.selectionChange.subscribe((s: MatSelectionListChange) => {          
        
      this.shoes.deselectAll();
      s.option.selected = true;
  });
  }

}
