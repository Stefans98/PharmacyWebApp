import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { Vacation } from '../../models/vacation.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';
import { VacationService } from '../../services/users/vacation.service';

@Component({
  selector: 'app-pharmacist-absence-request',
  templateUrl: './pharmacist-absence-request.component.html',
  styleUrls: ['./pharmacist-absence-request.component.scss']
})
export class PharmacistAbsenceRequestComponent implements OnInit {
  campaignOne: FormGroup;
  public pharmacistPharmacy : Pharmacy = new Pharmacy(0, '', '', '', '', '', 0, '');
  public startTime : Date = new Date();
  public endTime : Date = new Date();
  public minDate : Date = new Date();
  public vacation : Vacation;
  
  constructor(private vacationService : VacationService, private pharmacistService : PharmacistService,
    private authenticationService : AuthenticationService, private snackBar : MatSnackBar) {
    const today = new Date();
    const day = today.getDay()
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, day)),
      end: new FormControl(new Date(year, month, day))
    });

    this.pharmacistService.getPharmacyForPharmacist(this.authenticationService.getLoggedUserId())
    .subscribe( data => {
        this.pharmacistPharmacy = data;
      }
    );
   }

  ngOnInit(): void {
  }

  sendVacationRequest(): void {
    this.vacationService.sendVacationRequest(
      new Vacation(0, 1, this.startTime, this.endTime, this.authenticationService.getLoggedUserId(), this.pharmacistPharmacy.id)).subscribe(
      data => {
        this.vacation = data;
        this.refreshData()   
        this.openSnackBar('Uspešno ste poslali zahtev za odsustvo', 'Zatvori');   
      },
      error => {
        if (error.status = 500){
          this.refreshData();
          this.openSnackBar('Neuspešno slanje zahteva za odsustvo!', 'Zatvori');
        }
      });
    
  }

  refreshData() : void {
    this.startTime = new Date();
    this.endTime = new Date();
    this.minDate = new Date();
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
