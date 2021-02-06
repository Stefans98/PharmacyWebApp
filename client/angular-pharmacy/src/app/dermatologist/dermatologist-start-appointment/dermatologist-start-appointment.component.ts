import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MedicineSpecificationModalDialogComponent } from './medicine-specification-modal-dialog/medicine-specification-modal-dialog.component';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicineService } from '../../services/medicines/medicine.service';
import { SubscriptionMedicinesModalDialogComponent } from './subscription-medicines-modal-dialog/subscription-medicines-modal-dialog.component';
import { Medicine } from '../../models/medicine.model';
import { PrescriptionService } from '../../services/medicines/prescription.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

export interface ModalDialogData {
  madicine: Medicine;
  therapyDay: number;
}

@Component({
  selector: 'app-dermatologist-start-appointment',
  templateUrl: './dermatologist-start-appointment.component.html',
  styleUrls: ['./dermatologist-start-appointment.component.scss']
})

export class DermatologistStartAppointmentComponent implements OnInit {
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild(MatAccordion) accordion: MatAccordion;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;
    fiftFormGroup: FormGroup;
    selected = new FormControl(0);
    
    public patientFlag: Boolean = false;
    public patientAppointments : Appointment[] = [];
    public selectedAppointment : Appointment;
    public medicinesForPharmacy : Medicine[] = [];
    public therapyDay : number;
    public selectedMedicine : Medicine;
    public medicineForPrescription : Medicine;
    public availableAppointments : Appointment[] = [];
    public selectedNewAppointment : Appointment;
    public chosenAppointmentDate : Date;
    public startTime : Date;
    public endTime : Date;
    
    displayedColumns: string[] = ['name', 'manufacturer', 'type', 'specification', 'prescribe'];
    dataSource = new MatTableDataSource<Medicine>(this.medicinesForPharmacy);

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private appointmentService : AppointmentService, private authenticationService : AuthenticationService, private medicineService : MedicineService,
       private _formBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar, private prescriptionService : PrescriptionService, public router: Router) {}

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
        });
        this.thirdFormGroup = this._formBuilder.group({
        });
        this.fourthFormGroup = this._formBuilder.group({
        });
        this.fiftFormGroup = this._formBuilder.group({
      });
    }

    onChange(change: MatSelectionListChange) {
        console.log(change.option.value, change.option.selected);
    }

  onChangeAppointment(appointment) {
    this.selectedAppointment = appointment[0];
  }

  onChangeAvailableAppointment(availableAppointment) {
    this.selectedNewAppointment = availableAppointment[0];
  }

  onDateChange(chosenDate) {
    const _ = moment();
    const date = moment(chosenDate).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()})
    this.chosenAppointmentDate = date.toDate();
  }

  startTimeChange(value) {
    this.startTime = value;
    console.log(this.startTime)
  }

  endTimeChange(value) {
    this.endTime = value;
    console.log(this.endTime)
  }

  firstNextButtonClicked() : void {
    // DODAJ ZABRANE PRELASKA
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate selektovati pregled da bi ga započeli!', 'Zatvori', 3000);
    }      
  }

  secondNextButtonClicked() : void {  
    this.medicineService.getAllMedicinesForPharmacy(this.selectedAppointment.workDay.pharmacy.id).subscribe(
      data => {
        this.medicinesForPharmacy = data;
        this.dataSource.data = this.medicinesForPharmacy;
      },
      error => {
        if (error.status == 404){
          this.patientFlag = false;
          this.openSnackBar('Trenutno nema lekova u apoteci!', 'Zatvori', 3000);
        }
      }
    );
  }
  
  thirdNextButtonClicked() : void {  
    this.appointmentService.getAvailableExaminationTermsForDermatologist(this.authenticationService.getLoggedUserId(),
     this.selectedAppointment.workDay.pharmacy.id).subscribe(
      data => {
        this.availableAppointments = data;
      },
      error => {
        if (error.status == 404){

        }
      }
    );
  }

  fourthNextButtonClicked() : void {  
  }

  scheduleNewAppointment() : void {
    if(this.selected.value == 0) {
      if(this.selectedNewAppointment == null) {
        this.openSnackBar('Morate selektovati termin da bi ga zakazali!', 'Zatvori', 3000);
        return;
      }
      this.appointmentService.scheduleExamination(this.selectedNewAppointment).subscribe(
        data => {
          this.openSnackBar('Uspešno ste zakazali nov termin za pacijenta!', 'Zatvori', 3000);
          this.selectedNewAppointment = null;
          this.appointmentService.getAvailableExaminationTermsForDermatologist(this.authenticationService.getLoggedUserId(), this.selectedAppointment.workDay.pharmacy.id).subscribe(
           data => {
             this.availableAppointments = data;
           });
        },
        error => {
          this.openSnackBar('Zakazivanje izabranog termina trenutno nije moguće!', 'Zatvori', 3000);
        });
    } else if (this.selected.value == 1) {
      // Zakazivanje novog termina sa izborom datuma
    }
    
  }

  findPatientAppointments(): void {
    this.patientAppointments = [];
    if(this.searchInput.nativeElement.value == '') {
      this.openSnackBar('Morate popuniti polje za pretragu!', 'Zatvori', 3000);
      this.patientFlag = false;
      return;
    }
    this.appointmentService.getOccupiedAppointmentsByPatientEmail(this.searchInput.nativeElement.value, this.authenticationService.getLoggedUserId().toString()).subscribe(
      data => {
        this.patientAppointments = data;
        this.patientFlag = true;
      },
      error => {
        if (error.status == 400){
          this.patientFlag = false;
          this.openSnackBar('Ne postoji pacijenta sa e-mail adresom koju ste uneli!', 'Zatvori', 3000);
        }
        if (error.status == 404){
          this.patientFlag = false;
          this.openSnackBar('Ne postoje pregledi za pacijenta kog ste pronašli!', 'Zatvori', 3000);
        }
      }
    )
  }

  patientNotHeldOnAppointment() : void {
    if(this.selectedAppointment == null) {
      this.openSnackBar('Morate selektovati pregled pacijenta!', 'Zatvori', 3000);
      return;
    }
    this.appointmentService.patientNotHeldOnAppointment(this.selectedAppointment).subscribe(
      data => {
        this.patientFlag = false;
        this.selectedAppointment = null;
        this.patientAppointments = [];
        this.searchInput.nativeElement.value = '';
        this.openSnackBar('Uspešno ste završili pregled', 'Zatvori', 3000);
      },
      error => {
        if (error.status = 404){
          this.openSnackBar('Neuspešan završetak pregleda!', 'Zatvori', 3000);
        } 
      });
  }

  prescriptMedicine(medicineId : number) : void {  
    this.medicineService.isMedicineAvailable(medicineId.toString(), this.selectedAppointment.workDay.pharmacy.id.toString()).subscribe(
      data => {
        this.selectedMedicine = data;
        this.prescriptionService.savePrescription(this.selectedMedicine.id, this.selectedAppointment.patient.id,
           this.selectedAppointment.workDay.pharmacy.id, this.therapyDay) 
            .subscribe( data => {
              this.openSnackBar('Uspešno ste prepisali lek pacijentu!', 'Zatvori', 3000);
            },
            error => {
              if (error.status == 400){ // Pacijent je alergican na lek
                this.openSubscriptionMedicinesDialog(this.selectedMedicine);
              }
        });
      },
      error => {
        if (error.status = 404){         
          this.openSnackBar('Izabrani lek trenutno nije na stanju u apoteci! Uspešno ste obavestili administratora apoteke!', 'Zatvori', 4000);
          this.medicineService.saveMedicineInquiry(this.selectedAppointment.workDay.pharmacy.id,
             this.authenticationService.getLoggedUserId(), medicineId) 
             .subscribe( data => { });
        } 
      });
  }

  saveAppointmentReport() : void {
    this.router.navigate(['/auth/dermatologist/work-calendar']);
  }

  displayAppointmentRow(appointment : Appointment): string {
    return appointment.workDay.pharmacy.name + ', ' + this.convertDate(appointment.startTime) + ' ' + this.convertTime(appointment.startTime) + ' - ' + this.convertTime(appointment.endTime) + ', '
      + appointment.patient.firstName + ' ' + appointment.patient.lastName + ', ' + appointment.patient.email;
  }

  displayAvailableAppointmentRow(appointment : Appointment): string {
    return this.convertDate(appointment.startTime) + ' ' + this.convertTime(appointment.startTime) + ' - ' + this.convertTime(appointment.endTime);
  }

  convertDate(date : Date): string {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }

  convertTime(dateTime : Date): string {
    let d = new Date(dateTime);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    return (hours > 9 ? '' : '0') + hours + ":" + (minutes > 9 ? '' : '0') + minutes;
  }

  openMedicineSpecificationDialog(medicine : Medicine): void {
    const dialogRef = this.dialog.open(MedicineSpecificationModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '400px',
      height: '220px',
      position: {left: '650px'},
      data: { medicine : medicine, therapyDay : this.therapyDay }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.therapyDay = result;
    });
  }

  openSubscriptionMedicinesDialog(selectedMedicine : Medicine): void {
    const dialogRef = this.dialog.open(SubscriptionMedicinesModalDialogComponent, {
      panelClass: 'my-centered-dialog',
      width: '390px',
      height: '350px',
      position: {left: '650px'},
      data: { selectedMedicine : selectedMedicine }
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
