import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { Vacation } from '../../models/vacation.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
import { VacationService } from '../../services/users/vacation.service';

@Component({
  selector: 'app-dermatologist-vacation-request',
  templateUrl: './dermatologist-vacation-request.component.html',
  styleUrls: ['./dermatologist-vacation-request.component.scss']
})

export class DermatologistVacationRequestComponent implements OnInit {
  campaignOne: FormGroup;
  pharmacyControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  pharmacies: Pharmacy[] = [];
  public selectedPharmacy : Pharmacy;
  public startTime : Date = new Date();
  public endTime : Date = new Date();
  public minDate : Date = new Date();
  public vacation : Vacation;

  constructor(private vacationService : VacationService, private dermatologistService : DermatologistService,
       private authenticationService : AuthenticationService, private snackBar : MatSnackBar) { 
    const today = new Date();
    const day = today.getDay()
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day))
    });

    this.dermatologistService.getPharmaciesForDermatologist(this.authenticationService.getLoggedUserId())
    .subscribe( data => {
        this.pharmacies = data;
      }
    );

  }

  ngOnInit(): void {
  }

  onChangePharmacy(value) {
      this.selectedPharmacy = value;
  }

  sendVacationRequest(): void {
    if(this.selectedPharmacy == null) {
      this.openSnackBar('Morate izabrati apoteku!', 'Zatvori');
      return
    } 
    this.vacationService.sendVacationRequest(
      new Vacation(0, 0, this.startTime, this.endTime, this.authenticationService.getLoggedUserId(), this.selectedPharmacy.id)).subscribe(
      data => {
        this.vacation = data;
        this.refreshData();
        this.openSnackBar('Uspešno ste poslali zahtev za godišnji odmor', 'Zatvori');        
      },
      error => {
        if (error.status = 500){
          this.refreshData();
          this.openSnackBar('Neuspešno slanje zahteva za godišnji odmor!', 'Zatvori');
        }
      });
  }

  refreshData() : void {
    this.startTime = new Date();
    this.endTime = new Date();
    this.minDate = new Date();
    this.selectedPharmacy = null;
  }

  // TOAST
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
