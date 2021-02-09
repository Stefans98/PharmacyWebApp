import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { MatSelectionListChange } from '@angular/material/list';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicineService } from '../../services/medicines/medicine.service';
import { Medicine } from '../../models/medicine.model';
import { PrescriptionService } from '../../services/medicines/prescription.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { SubscriptionMedicinesModalDialogPharmacistComponent } from './subscription-medicines-modal-dialog-pharmacist/subscription-medicines-modal-dialog-pharmacist.component';
import { MedicineSpecificationModalDialogPharmacistComponent } from './medicine-specification-modal-dialog-pharmacist/medicine-specification-modal-dialog-pharmacist.component';
import { AppointmentReport } from '../../models/appointment-report.model';
import { Prescription } from '../../models/prescription.model';

@Component({
  selector: 'app-pharmacist-start-appointment',
  templateUrl: './pharmacist-start-appointment.component.html',
  styleUrls: ['./pharmacist-start-appointment.component.scss']
})

export class PharmacistStartAppointmentComponent implements OnInit {
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild(MatAccordion) accordion: MatAccordion;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;
    fiftFormGroup: FormGroup;

    maxDate: Date = new Date();
    minTimeFinishing: string = '00:00';
    disabledTimeFinishing: boolean = true;
    time1: string = '00:00';
    time2: string = '00:00';

    chosenDate: string = '';
    startTime: string = '';
    endTime: string = '';
    
    public patientFlag: Boolean = false;
    public patientAppointments : Appointment[] = [];
    public selectedAppointment : Appointment;
    public medicinesForPharmacy : Medicine[] = [];
    public therapyDay : number = 1;
    public selectedMedicine : Medicine;
    public medicineForPrescription : Medicine;
    public selectedNewAppointment : Appointment;
    public newAppointmentTerm : Appointment;
    public appointmentReportInformations : string;
    public appointmentPrice : number = 0.0;
    public appointmentReport : AppointmentReport;
    public prescriptions : Prescription[] = [];
    public prescription : Prescription;
    public appointmentIdFromWorkCalendar : number = 0;
    
    displayedColumns: string[] = ['name', 'manufacturer', 'type', 'specification', 'prescribe'];
    dataSource = new MatTableDataSource<Medicine>(this.medicinesForPharmacy);

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    myTimePickerTheme: NgxMaterialTimepickerTheme = {
      container: {
          bodyBackgroundColor: '#ffffff',
          buttonColor: '#5c6bc0'
      },
      dial: {
          dialBackgroundColor: '#5c6bc0',
      },
      clockFace: {
          clockFaceBackgroundColor: '#e8eaf6',
          clockHandColor: '#5c6bc0',
          clockFaceTimeInactiveColor: '#000000'
      }
    };

    constructor(private appointmentService : AppointmentService, private authenticationService : AuthenticationService, private medicineService : MedicineService, private route: ActivatedRoute,
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
          fourthCtrl: [],
          timePicker1: [],
          timePicker2: []     
        });
        this.fiftFormGroup = this._formBuilder.group({                 
      });
      this.appointmentIdFromWorkCalendar = Number(this.route.snapshot.queryParamMap.get('appointmentId'));
      if(this.appointmentIdFromWorkCalendar != 0) {
        // From work calendar
        this.appointmentService.getAppointmentById(this.appointmentIdFromWorkCalendar).subscribe(
          data => {
            this.selectedAppointment = data;
            this.searchInput.nativeElement.disabled = true;
            this.patientAppointments.push(this.selectedAppointment);
            this.patientFlag = true;
            this.openSnackBar('Selektujte ponuđen termin koji ste izabrali iz radnog kalendara! NAPOMENA: Ne možete vršiti pretragu zato što ste izabrali termin iz vašeg radnog kalendara', 'Zatvori', 6000);
          },
          error => {
            if (error.status == 404){
              this.openSnackBar('Doslo je do greške prilikom početka pregleda. Pokušajte ponovo da pronađete željeni pregled!', 'Zatvori', 4000);
            }
          }
        );
      } else {
        // Select new appointment
      }
    }

  onDateChange(chosenDate) {
    this.chosenDate = moment(chosenDate).format('YYYY-MM-DD')
  }

  onStartTimeChange(value) {
    this.startTime = value;
    this.endTime = this.startTime;
    this.minTimeFinishing = value;
    this.disabledTimeFinishing = false;
  }

  onEndTimeChange(value) {
    this.endTime = value;
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

  firstNextButtonClicked() : void {
    if (!this.firstFormGroup.valid) {
      this.openSnackBar('Morate selektovati savetovanje da bi ga započeli!', 'Zatvori', 3000);
    }      
  }

  secondNextButtonClicked(textAreaValue) : void {  
    this.appointmentReportInformations = textAreaValue; 
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
    this.fourthFormGroup.get('timePicker1').clearValidators();
    this.fourthFormGroup.get('timePicker1').updateValueAndValidity();
    this.fourthFormGroup.get('timePicker2').clearValidators();
    this.fourthFormGroup.get('timePicker2').updateValueAndValidity();
    this.fourthFormGroup.get('fourthCtrl').clearValidators();
    this.fourthFormGroup.get('fourthCtrl').updateValueAndValidity();
  }

  fourthNextButtonClicked() : void {  
  }

  scheduleNewAppointment() : void {
    if(this.chosenDate == '' || this.startTime == '' || this.endTime == '') {
      this.openSnackBar('Morate izabrati datum i početno i krajnje vreme termina!', 'Zatvori', 3000);
      return;
    }
    const forrmatedReservationDate = this.chosenDate + ' ' + '00:00';
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;
    this.appointmentService.getAppointmentPrice(forrmatedReservationDate, forrmatedStartTime, forrmatedEndTime, this.selectedAppointment.workDay.pharmacy.id.toString()).subscribe(
      data => {
        this.appointmentPrice = data;
    });
    this.newAppointmentTerm = new Appointment(0, 1, 1, new Date(forrmatedStartTime), new Date(forrmatedEndTime), this.selectedAppointment.patient, this.selectedAppointment.workDay, null, this.appointmentPrice); 
    this.appointmentService.scheduleExamination(this.newAppointmentTerm).subscribe(
      data => {
        this.openSnackBar('Uspešno ste zakazali novo savetovanje za pacijenta i obavestili ga putem e-mail pošte!', 'Zatvori', 4200);
        //this.chosenDate = null;
        this.startTime = null;
        this.endTime = null;
      },
      error => {
        this.openSnackBar('Izabrani termin trenutno ne možete da zakažete!', 'Zatvori', 3000);
    });  
  }

  findPatientAppointments(): void {
    if(this.searchInput.nativeElement.disabled) {
      this.openSnackBar('Ne možete vršiti pretragu zato što ste izabrali pregled iz radnog kalendara!', 'Zatvori', 4000);
      return;
    }
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
          this.openSnackBar('Ne postoje savetovanja za pacijenta kog ste pronašli!', 'Zatvori', 3000);
        }
      }
    )
  }

  patientNotHeldOnAppointment() : void {
    if(this.selectedAppointment == null) {
      this.openSnackBar('Morate selektovati savetovanje pacijenta!', 'Zatvori', 3000);
      return;
    }
    this.appointmentService.patientNotHeldOnAppointment(this.selectedAppointment).subscribe(
      data => {
        this.patientFlag = false;
        this.selectedAppointment = null;
        this.patientAppointments = [];
        this.searchInput.nativeElement.disabled = false;
        this.searchInput.nativeElement.value = '';
        this.openSnackBar('Uspešno ste završili savetovanje', 'Zatvori', 3000);
      },
      error => {
        if (error.status = 404){
          this.openSnackBar('Neuspešan završetak savetovanje!', 'Zatvori', 3000);
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
              this.therapyDay = 1;
              if(data != null) {
                this.prescriptions.push(data);
              }
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
    this.appointmentReport = new AppointmentReport(0, this.appointmentReportInformations, this.selectedAppointment, this.prescriptions);
    this.appointmentService.saveAppointmentReport(this.appointmentReport).subscribe(
      data => {
        this.appointmentReport = data;
        this.openSnackBar('Uspešno ste završili savetovanje za pacijenta!', 'Zatvori', 3000);
      }
    );
    this.router.navigate(['/auth/pharmacist/work-calendar']);
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

  translateMedicineType(type : string) : string {
    if (type == 'ANTIBIOTIC') {
      return 'antibiotik';
    } else if (type == 'ANALGESIC') {
      return 'anelgetik';
    } else if (type == 'ANTIHISTAMINE') {
      return 'antihistaminik';
    } else if (type == 'VACCINE') {
      return 'vakcina';
    } else if (type == 'ANTISEPTIC') {
      return 'antiseptik';
    } else if (type == 'ANTIPYRETIC') {
      return 'antipiretik';
    } else if (type == 'TRANQUILISER') {
      return 'sedativ';
    } else {
      return 'vitamini';
    }
  }

  openMedicineSpecificationDialog(medicine : Medicine): void {
    const dialogRef = this.dialog.open(MedicineSpecificationModalDialogPharmacistComponent, {
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
    const dialogRef = this.dialog.open(SubscriptionMedicinesModalDialogPharmacistComponent, {
      panelClass: 'my-centered-dialog',
      width: '390px',
      height: '350px',
      position: {left: '650px'},
      data: { selectedMedicine : selectedMedicine, selectedAppointment : this.selectedAppointment, prescription : this.prescription }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.prescription = result;
      if(this.prescription != null) {
        this.prescriptions.push(this.prescription);     
      }
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
