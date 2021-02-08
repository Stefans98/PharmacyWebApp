import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Appointment } from '../../../models/appointment.model';
import { Medicine } from '../../../models/medicine.model';
import { Prescription } from '../../../models/prescription.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { PrescriptionService } from '../../../services/medicines/prescription.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { MedicineSpecificationModalDialogPharmacistComponent } from '../medicine-specification-modal-dialog-pharmacist/medicine-specification-modal-dialog-pharmacist.component';

@Component({
  selector: 'app-subscription-medicines-modal-dialog-pharmacist',
  templateUrl: './subscription-medicines-modal-dialog-pharmacist.component.html',
  styleUrls: ['./subscription-medicines-modal-dialog-pharmacist.component.scss']
})
export class SubscriptionMedicinesModalDialogPharmacistComponent implements OnInit, AfterViewInit {

  public medicineSubtitutions : Medicine[] = [];
  public medicineForPrescription : Medicine;
  public selectedMedicine : Medicine;
  public selectedAppointment : Appointment;
  public therapyDay : number = 1;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialogReff: MatDialogRef<SubscriptionMedicinesModalDialogPharmacistComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedMedicineData: { selectedMedicine : Medicine }, 
    @Inject(MAT_DIALOG_DATA) public selectedAppointmentData: { selectedAppointment : Appointment },
    @Inject(MAT_DIALOG_DATA) public prescriptionData: { prescription : Prescription },
      private medicineService : MedicineService, private snackBar: MatSnackBar, public dialog: MatDialog, private prescriptionService : PrescriptionService, private authenticationService : AuthenticationService) { 
        this.selectedMedicine = selectedMedicineData.selectedMedicine;
        this.selectedAppointment = selectedAppointmentData.selectedAppointment;
      }

  ngOnInit(): void {
  }

  ngAfterViewInit() : void {
    this.medicineService.getMedicineSubstitutions(this.selectedMedicine.id).subscribe(
      data => {
        this.medicineSubtitutions = data;
      },
      error => {
        if (error.status = 404){

        } 
      });
  }
  
  substituteMedicineClick() : void {
    if(this.medicineForPrescription == null) {
      this.openSnackBar('Morate selektovati lek da bi ga prepisali pacijentu!', 'Zatvori', 3000);
      return;
    } else {
      this.medicineForPrescription = this.medicineForPrescription[0];
      this.medicineService.isMedicineAvailable(this.medicineForPrescription.id.toString(), this.selectedAppointment.workDay.pharmacy.id.toString()).subscribe(
        data => {
          this.medicineForPrescription = data;
          this.openMedicineSpecificationDialog(this.medicineForPrescription);        
        },
        error => {
          if (error.status = 404){         
            this.openSnackBar('Izabrani lek trenutno nije na stanju u apoteci! Uspešno ste obavestili administratora apoteke!', 'Zatvori', 4000);
            this.medicineService.saveMedicineInquiry(this.selectedAppointment.workDay.pharmacy.id,
               this.authenticationService.getLoggedUserId(), this.medicineForPrescription.id).subscribe(
                  data => { });
          } 
        });
    }
  }

  closeDialogClick(): void {
    this.dialogReff.close();
  }

  showRow(medicine : Medicine): string {
    return medicine.name + ', ' + medicine.medicineType;
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
      this.prescriptionService.savePrescription(this.medicineForPrescription.id, this.selectedAppointment.patient.id,
        this.selectedAppointment.workDay.pharmacy.id, this.therapyDay) 
         .subscribe( data => {
           this.openSnackBar('Uspešno ste prepisali lek pacijentu!', 'Zatvori', 3000);
           this.therapyDay = 1;
           //this.prescriptionData.prescription = data;
           this.dialogReff.close(data);
         },
         error => {
           if (error.status == 400){ // Pacijent je alergican na lek
             this.openSnackBar('Pacijent je alergičan na izabrani lek!', 'Zatvori', 3000);
             this.dialogReff.close();
           }
     });
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
