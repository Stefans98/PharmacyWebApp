import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BenefitsModalDialogComponent } from './benefits-modal-dialog/benefits-modal-dialog.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  public name: String;
  public surname: String;
  public email: String;
  public phoneNumber: String;
  public password: String;
  public repetPassword: String;
  public city: String;
  public street: String;
  public country: String;
  allergies = new FormControl();
  public allergyList: string[];
  public points: number;
  public userCategory: String;

  constructor(public dialog: MatDialog) { 
    this.name = 'Petar';
    this.surname = 'Petrovic';
    this.email = 'pera@test.com'
    this.phoneNumber = '+381/65-123-456';
    this.password = '12345';
    this.repetPassword = this.password;
    this.city = "Beograd";
    this.street = "Cara Lazara 1";
    this.country = "Srbija";
    this.allergyList = ['Brufen', 'Paracetamol', 'Probiotik', 'Panadol', 'Andol'];
    this.points = 13;
    this.userCategory = "Regularna"
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(BenefitsModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '450px',
      height: '250px',
      position: {left: '855px'}
    });
  }
}
