import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicineReservation } from '../../models/medicineReservation.model';
import { Patient } from '../../models/patient.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { User } from '../../models/user.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-pharmacist-medicine-issue',
  templateUrl: './pharmacist-medicine-issue.component.html',
  styleUrls: ['./pharmacist-medicine-issue.component.scss']
})

export class PharmacistMedicineIssueComponent implements OnInit {
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild(MatAccordion) accordion: MatAccordion;

    public medicineReservations : MedicineReservation[] = [];
    public medicineReservation : MedicineReservation;
    public selectedMedicineReservation : MedicineReservation;
    public pharmacistPharmacy : Pharmacy;
    public medicineReservationExist : boolean = false;
    public patient : User = new User(0, '', '', '', '', '', '', '', '');

    constructor(private medicineService : MedicineService, private pharmacistService : PharmacistService,
       private authenticationService : AuthenticationService, private userService : UserService, private snackBar: MatSnackBar) {
        this.pharmacistService.getPharmacyForPharmacist(this.authenticationService.getLoggedUserId())
          .subscribe( data => {
              this.pharmacistPharmacy = data;
            }
        );
      }

    ngOnInit(): void {
    }

    findMedicineReservation() : void {
      this.medicineService.findMedicineReservationByUniqueCode(this.searchInput.nativeElement.value, this.pharmacistPharmacy.id.toString()).subscribe(
        data => {
          this.medicineReservation = data;
          this.medicineReservations.push(this.medicineReservation);
          this.medicineReservationExist = true;
          this.userService.getUserById(this.medicineReservation.patientId).subscribe(
            data => {
              this.patient = data;
            });
        },
        error => {
          if (error.status == 404){
            this.openSnackBar('Broj rezervacije leka nije ispravan!', 'Zatvori', 3000);
            this.refreshData();
          }
        }
      )
    }

    issueMedicineReservationClick() : void {
      if(this.selectedMedicineReservation == null) {
        this.openSnackBar('Morate selektovati rezervaciju leka kako bi izdali lek pacijentu!', 'Zatvori', 3000);
        return;
      }
      this.medicineService.issueMedicineReservation(this.selectedMedicineReservation[0].id).subscribe(
        data => {    
          this.openSnackBar('Uspešno ste izdali rezervisan lek pacijentu i obavestili ga putam e-mail pošte!', 'Zatvori', 3500);
          this.refreshData()
        },
        error => {
          if (error.status = 404){
            this.refreshData()
          } 
        });
    }

    showMedicineReservation(medicineReservation : MedicineReservation) : string {           
      return 'Lek: ' + medicineReservation.medicine.name + ', Pacijent: ' + this.patient.firstName + ' ' + this.patient.lastName + ', Rok preuzimanja: ' + this.convertDate(medicineReservation.finalPurchasingDate);
    }

    refreshData() : void {
      this.medicineReservationExist = false;
      this.medicineReservation = null;
      this.selectedMedicineReservation = null;
      this.medicineReservations = []
      this.patient = new User(0, '', '', '', '', '', '', '', '');
    }

    convertDate(date : Date): string {
      let d = new Date(date);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate(); 
      return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
    }

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    openSnackBar(message: string, action: string, duration: number) {
      this.snackBar.open(message, action, {
        duration: duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
}
