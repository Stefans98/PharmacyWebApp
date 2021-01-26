import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AllPharmaciesComponent } from './patient/pharmacy/all-pharmacies/all-pharmacies.component';
import { MyPharmaciesComponent } from './patient/pharmacy/my-pharmacies/my-pharmacies.component';
import { DermatologistAppointmentHistoryComponent } from './patient/dermatologist/dermatologist-appointment-history/dermatologist-appointment-history.component';
import { DermatologistScheduledAppointmentsComponent } from './patient/dermatologist/dermatologist-scheduled-appointments/dermatologist-scheduled-appointments.component';
import { DermatologistSchedulingComponent } from './patient/dermatologist/dermatologist-scheduling/dermatologist-scheduling.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { PharmacistCounselingHistoryComponent } from './patient/pharmacist/pharmacist-counseling-history/pharmacist-counseling-history.component';
import { PharmacistScheduledCounselingComponent } from './patient/pharmacist/pharmacist-scheduled-counseling/pharmacist-scheduled-counseling.component';
import { PharmacistSchedulingComponent } from './patient/pharmacist/pharmacist-scheduling/pharmacist-scheduling.component';
import { ReservedDrugsComponent } from './patient/drugs/reserved-drugs/reserved-drugs.component';
import { DispensedDrugsComponent } from './patient/drugs/dispensed-drugs/dispensed-drugs.component';
import { TakingDrugsComponent } from './patient/drugs/taking-drugs/taking-drugs.component';
import { EPrescriptionComponent } from './patient/e-prescription/e-prescription.component';
import { PenaltyComponent } from './patient/penalty/penalty.component';
import { ComplaintsComponent } from './patient/complaints/complaints.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AllPharmaciesComponent,
    MyPharmaciesComponent,
    DermatologistAppointmentHistoryComponent,
    DermatologistScheduledAppointmentsComponent,
    DermatologistSchedulingComponent,
    PatientProfileComponent,
    PharmacistCounselingHistoryComponent,
    PharmacistScheduledCounselingComponent,
    PharmacistSchedulingComponent,
    ReservedDrugsComponent,
    DispensedDrugsComponent,
    TakingDrugsComponent,
    EPrescriptionComponent,
    PenaltyComponent,
    ComplaintsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
