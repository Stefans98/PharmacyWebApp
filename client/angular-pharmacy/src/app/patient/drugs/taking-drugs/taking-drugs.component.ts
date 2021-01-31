import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-taking-drugs',
  templateUrl: './taking-drugs.component.html',
  styleUrls: ['./taking-drugs.component.scss']
})
export class TakingDrugsComponent implements OnInit {

  maxDate : Date;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  patients: string[] = ['Petar Petrovic', 'Jovan Jovic','Petar Petrovic', 'Jovan Jovic','Petar Petrovic', 'Jovan Jovic','Petar Petrovic', 'Jovan Jovic','Petar Petrovic', 'Jovan Jovic','Petar Petrovic', 'Jovan Jovic',];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, ) {}

  ngOnInit() {
    this.maxDate = new Date();

    this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
    });
  }

  onChange(change: MatSelectionListChange) {
      console.log(change.option.value, change.option.selected);
  }

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate selektovati lek!', 'Zatvori');
    }
  }

  secondNextButtonClicked() : void {
    if (!this.secondFormGroup.valid) {
      this.openSnackBar('Morate selektovati apoteku!', 'Zatvori');
    }
  }

  thirdNextButtonClicked() : void {
    if (!this.thirdFormGroup.valid) {
      this.openSnackBar('Morate izabrati datum!', 'Zatvori');
    }
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
