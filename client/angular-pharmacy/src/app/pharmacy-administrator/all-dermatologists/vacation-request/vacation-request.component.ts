import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Dermatologist } from '../../../models/dermatologist.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { Vacation } from '../../../models/vacation.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { DermatologistService } from '../../../services/users/dermatologist.service';
import { VacationService } from '../../../services/users/vacation.service';
import { PharmacistForRequestComponent } from '../../vacation-request/pharmacist-for-request/pharmacist-for-request.component';
import { EmployeeForRequestDialogComponent } from './employee-for-request-dialog/employee-for-request-dialog.component';
import { RejectRequestDialogComponent } from './reject-request-dialog/reject-request-dialog.component';

export interface VacationRequestItem {
  requestType: number;
  employeeFirstName: string;
  employeeLastName: string;
}

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.scss']
})

export class VacationRequestComponent implements OnInit {

  public vacationRequests: Vacation[];
  public vacationRequestsForPharmacists: Vacation[];
  public pharmacy: Pharmacy;
  public vacations: VacationRequestItem[];

  displayedColumns = ['dermatologist', 'startDate', 'endDate', 'vacationType', 'accept', 'reject', 'processed'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacyService: PharmacyService, private authService: AuthenticationService, private vacationService: VacationService, 
              private dermatologistService: DermatologistService, public dialog: MatDialog) {
    this.vacations = [];
    pharmacyService.getPharmacyByPharmacyAdminId(authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        vacationService.getVacationRequestsForDermatologist(this.pharmacy.id).subscribe(
          data => {
            this.vacationRequests = data;
          }
        );
      }
    );

    pharmacyService.getPharmacyByPharmacyAdminId(authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        vacationService.getVacationRequestsForPharmacists(this.pharmacy.id).subscribe(
          data => {
            this.vacationRequestsForPharmacists = data;
          }
        );
      }
    );

   }

  ngOnInit(): void {
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }

  convertVacationType(type){
    if(type == 0){
      return 'GODIŠNJI ODMOR'
    }else if(type == 1){
      return 'ODSUSTVO'
    }
  }

  convertProcessed(processed){
    if(processed == true){
      return 'PRIHVAĆEN';
    }else if(processed == false){
      return 'ODBIJEN';
    }else if(processed == null){
      return 'NIJE OBRAĐEN';
    }
  }

  openDialog(employeeId) {
    const dialogRef = this.dialog.open(EmployeeForRequestDialogComponent, {
      data: employeeId
    });
  }

  openDialogPharmacists(employeeId) {
    const dialogRef = this.dialog.open(PharmacistForRequestComponent, {
      data: employeeId
    });
  }

  acceptRequest(request){
    if(request.processed != null){
      this.openSnackBar('Zahtev je vec odobren ili odbijen!', 'Zatvori');
      return;
    }
    this.vacationService.acceptVacationRequest(request).subscribe(
      data =>{
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            this.vacationService.getVacationRequestsForDermatologist(this.pharmacy.id).subscribe(
              data => {
                this.vacationRequests = data;
                this.openSnackBar('Zahtev je prihvaćen', 'Zatvori');
              }
            );
          }
        );
      }
    );
  }

  acceptRequestForPharmacist(request){
    if(request.processed == true){
      this.openSnackBar('Zahtev je vec odobren ili odbijen!', 'Zatvori');
      return;
    }
    this.vacationService.acceptVacationRequest(request).subscribe(
      data =>{
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            this.vacationService.getVacationRequestsForPharmacists(this.pharmacy.id).subscribe(
              data => {
                this.vacationRequestsForPharmacists = data;
              }
            );
          }
        );
      }
    );
  }

  rejectRequest(request){
    if(request.processed == true || request.processed == false){
      this.openSnackBar('Zahtev je vec odobren ili odbijen!', 'Zatvori');
      return;
    }
    const dialogRef = this.dialog.open(RejectRequestDialogComponent, {
      data: request
    }); 
    
    dialogRef.afterClosed().subscribe(result => {
      this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
        data => {
          this.pharmacy = data;
          this.vacationService.getVacationRequestsForDermatologist(this.pharmacy.id).subscribe(
            data => {
              this.vacationRequests = data;
            }
          );
        }
      );
    });
  }

  rejectRequestForPharmacist(request){
    if(request.processed == true){
      this.openSnackBar('Zahtev je vec odobren ili odbijen!', 'Zatvori');
      return;
    }
    const dialogRef = this.dialog.open(RejectRequestDialogComponent, {
      data: request
    }); 

    dialogRef.afterClosed().subscribe(result => {
      this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
        data => {
          this.pharmacy = data;
          this.vacationService.getVacationRequestsForPharmacists(this.pharmacy.id).subscribe(
            data => {
              this.vacationRequestsForPharmacists = data;
            }
          );
        }
      );
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 30500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
