import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { DermatologistPatientsComponent } from './dermatologist/dermatologist-patients/dermatologist-patients.component';
import { DermatologistStartAppointmentComponent } from './dermatologist/dermatologist-start-appointment/dermatologist-start-appointment.component';
import { DermatologistWorkCalendarComponent } from './dermatologist/dermatologist-work-calendar/dermatologist-work-calendar.component';
import { DermatologistProfileComponent } from './dermatologist/dermatologist-profile/dermatologist-profile.component';
import { DermatologistNewAppointmentComponent } from './dermatologist/dermatologist-new-appointment/dermatologist-new-appointment.component';
import { DermatologistVacationRequestComponent } from './dermatologist/dermatologist-vacation-request/dermatologist-vacation-request.component';
import { DermatologistAbsenceRequestComponent } from './dermatologist/dermatologist-absence-request/dermatologist-absence-request.component';
import { MaterialModule } from './material-module';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BenefitsModalDialogComponent } from './patient/patient-profile/benefits-modal-dialog/benefits-modal-dialog.component';
import { PharmacyComponent } from './pharmacy-administrator/pharmacy/pharmacy.component';
import { PharmacyAdministratorMyPharmacyComponent } from './pharmacy-administrator/pharmacy-administrator-my-pharmacy/pharmacy-administrator-my-pharmacy.component';
import { FreeAppointmentsComponent } from './pharmacy-administrator/free-appointments/free-appointments.component';
import { BusinessReportComponent } from './pharmacy-administrator/business-report/business-report.component';
import { AllAvailableMedicinesComponent } from './pharmacy-administrator/all-available-medicines/all-available-medicines.component';
import { AddMedicineComponent } from './pharmacy-administrator/add-medicine/add-medicine.component';
import { RequestForMedicinesComponent } from './pharmacy-administrator/request-for-medicines/request-for-medicines.component';
import { AllPharmacistsComponent } from './pharmacy-administrator/all-pharmacists/all-pharmacists.component';
import { AddPharmacistComponent } from './pharmacy-administrator/add-pharmacist/add-pharmacist.component';
import { AllDermatologistsComponent } from './pharmacy-administrator/all-dermatologists/all-dermatologists.component';
import { AddDermatologistComponent } from './pharmacy-administrator/add-dermatologist/add-dermatologist.component';
import { AllOrderListsComponent } from './pharmacy-administrator/all-order-lists/all-order-lists.component';
import { CreateOrderListComponent } from './pharmacy-administrator/create-order-list/create-order-list.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MedicineSpecificationModalDialogComponent } from './dermatologist/dermatologist-start-appointment/medicine-specification-modal-dialog/medicine-specification-modal-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { DermatologistRegistrationComponent } from './system-administrator/dermatologist-registration/dermatologist-registration.component';
import { PharmacyRegistrationComponent } from './system-administrator/pharmacy-registration/pharmacy-registration.component';
import { PharmacyAdministratorRegistrationComponent } from './system-administrator/pharmacy-administrator-registration/pharmacy-administrator-registration.component';
import { SupplierRegistrationComponent } from './system-administrator/supplier-registration/supplier-registration.component';
import { PharmaciesModalDialogComponent } from './dermatologist/dermatologist-profile/pharmacies-modal-dialog/pharmacies-modal-dialog.component';
import { SysAdminPharmaciesModalDialogComponent } from './system-administrator/pharmacy-administrator-registration/pharmacies-modal-dialog/pharmacies-modal-dialog.component';
import { PharmacistAbsenceRequestComponent } from './pharmacist/pharmacist-absence-request/pharmacist-absence-request.component';
import { PharmacistPatientsComponent } from './pharmacist/pharmacist-patients/pharmacist-patients.component';
import { PharmacistProfileComponent } from './pharmacist/pharmacist-profile/pharmacist-profile.component';
import { PharmacistNewAppointmentComponent } from './pharmacist/pharmacist-new-appointment/pharmacist-new-appointment.component';
import { PharmacistStartAppointmentComponent } from './pharmacist/pharmacist-start-appointment/pharmacist-start-appointment.component';
import { PharmacistVacationRequestComponent } from './pharmacist/pharmacist-vacation-request/pharmacist-vacation-request.component';
import { PharmacistWorkCalendarComponent } from './pharmacist/pharmacist-work-calendar/pharmacist-work-calendar.component';
import { PharmacistMedicineIssueComponent } from './pharmacist/pharmacist-medicine-issue/pharmacist-medicine-issue.component';
import { PharmacyModalDialogComponent } from './pharmacist/pharmacist-profile/pharmacy-modal-dialog/pharmacy-modal-dialog.component';
import { LoyaltyProgramComponent } from './system-administrator/loyalty-program/loyalty-program.component';
import { SystemAdministratorRegistrationComponent } from './system-administrator/system-administrator-registration/system-administrator-registration.component';
import { MatTableModule } from '@angular/material/table';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { PatientModalDialogComponent } from './dermatologist/dermatologist-new-appointment/patient-modal-dialog/patient-modal-dialog.component';
import { PharmaciesForDermatologistDialogComponent } from './pharmacy-administrator/all-dermatologists/pharmacies-for-dermatologist-dialog/pharmacies-for-dermatologist-dialog.component';
import { MedicineOrderListsComponent } from './supplier/medicine-order-lists/medicine-order-lists.component';
import { MyOffersComponent } from './supplier/my-offers/my-offers.component';
import { SupplierProfileComponent } from './supplier/supplier-profile/supplier-profile.component';
import { IssueOfferModalDialogComponent } from './supplier/medicine-order-lists/issue-offer-modal-dialog/issue-offer-modal-dialog.component';
import { EditOfferModalDialogComponent } from './supplier/my-offers/edit-offer-modal-dialog/edit-offer-modal-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { SubscriptionMedicinesModalDialogComponent } from './dermatologist/dermatologist-start-appointment/subscription-medicines-modal-dialog/subscription-medicines-modal-dialog.component';
import { ChooseComplaintEntityModalDialogComponent } from './patient/complaints/choose-complaint-entity-modal-dialog/choose-complaint-entity-modal-dialog.component';
import { AnswerComplaintsComponent } from './system-administrator/answer-complaints/answer-complaints.component';
import { AnswerComplaintModalDialogComponent } from './system-administrator/answer-complaints/answer-complaint-modal-dialog/answer-complaint-modal-dialog.component';
import { UpdateOrderListDialogComponent } from './pharmacy-administrator/all-order-lists/update-order-list-dialog/update-order-list-dialog.component';
import { OrderListOffersDialogComponent } from './pharmacy-administrator/all-order-lists/order-list-offers-dialog/order-list-offers-dialog.component';
import { PharmacyProfileComponent } from './pharmacy-profile/pharmacy-profile.component';
import { PharmacyProfileHomeComponent } from './pharmacy-profile/pharmacy-profile-home/pharmacy-profile-home.component';
import { DermatologistsForPharmacyComponent } from './pharmacy-profile/dermatologists-for-pharmacy/dermatologists-for-pharmacy.component';
import { PharmacistsForPharmacyComponent } from './pharmacy-profile/pharmacists-for-pharmacy/pharmacists-for-pharmacy.component';
import { DermatologistsForPharmacyDialogComponent } from './pharmacy-profile/dermatologists-for-pharmacy/dermatologists-for-pharmacy-dialog/dermatologists-for-pharmacy-dialog.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DefinePromotionComponent } from './pharmacy-administrator/define-promotion/define-promotion.component';
import { VacationRequestComponent } from './pharmacy-administrator/all-dermatologists/vacation-request/vacation-request.component';
import { VacationRequestPharmacistsComponent } from './pharmacy-administrator/all-pharmacists/vacation-request-pharmacists/vacation-request-pharmacists.component';
import { EmployeeForRequestDialogComponent } from './pharmacy-administrator/all-dermatologists/vacation-request/employee-for-request-dialog/employee-for-request-dialog.component';
import { RejectRequestDialogComponent } from './pharmacy-administrator/all-dermatologists/vacation-request/reject-request-dialog/reject-request-dialog.component';
import { PharmacistForRequestComponent } from './pharmacy-administrator/vacation-request/pharmacist-for-request/pharmacist-for-request.component';
import { DefineTermsDialogComponent } from './pharmacy-administrator/all-dermatologists/define-terms-dialog/define-terms-dialog.component';

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
    HomeComponent,
    DermatologistPatientsComponent,
    DermatologistStartAppointmentComponent,
    DermatologistWorkCalendarComponent,
    DermatologistProfileComponent,
    DermatologistNewAppointmentComponent,
    DermatologistWorkCalendarComponent,
    DermatologistVacationRequestComponent,
    DermatologistAbsenceRequestComponent,
    BenefitsModalDialogComponent,
    PharmacyComponent,
    PharmacyAdministratorMyPharmacyComponent,
    FreeAppointmentsComponent,
    BusinessReportComponent,
    AllAvailableMedicinesComponent,
    AddMedicineComponent,
    RequestForMedicinesComponent,
    AllPharmacistsComponent,
    AddPharmacistComponent,
    AllDermatologistsComponent,
    AddDermatologistComponent,
    AllOrderListsComponent,
    CreateOrderListComponent,
    LoginComponent,
    DermatologistRegistrationComponent,
    PharmacyRegistrationComponent,
    PharmacyAdministratorRegistrationComponent,
    SupplierRegistrationComponent,
    LoginComponent,
    MedicineSpecificationModalDialogComponent,
    PharmaciesModalDialogComponent,
    PharmacistAbsenceRequestComponent,
    PharmacistPatientsComponent,
    PharmacistProfileComponent,
    PharmacistNewAppointmentComponent,
    PharmacistStartAppointmentComponent,
    PharmacistVacationRequestComponent,
    PharmacistWorkCalendarComponent,
    PharmacistMedicineIssueComponent,
    PharmacyModalDialogComponent,
    LoyaltyProgramComponent,
    SystemAdministratorRegistrationComponent,
    SysAdminPharmaciesModalDialogComponent,
    PatientModalDialogComponent,
    PharmaciesForDermatologistDialogComponent,
    MedicineOrderListsComponent,
    MyOffersComponent,
    SupplierProfileComponent,
    IssueOfferModalDialogComponent,
    EditOfferModalDialogComponent,
    SubscriptionMedicinesModalDialogComponent,
    ChooseComplaintEntityModalDialogComponent,
    AnswerComplaintsComponent,
    AnswerComplaintModalDialogComponent,
    UpdateOrderListDialogComponent,
    OrderListOffersDialogComponent,
    PharmacyProfileComponent,
    PharmacyProfileHomeComponent,
    DermatologistsForPharmacyComponent,
    PharmacistsForPharmacyComponent,
    DermatologistsForPharmacyDialogComponent,
    DefinePromotionComponent,
    VacationRequestComponent,
    VacationRequestPharmacistsComponent,
    EmployeeForRequestDialogComponent,
    RejectRequestDialogComponent,
    PharmacistForRequestComponent,
    DefineTermsDialogComponent
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    NgxMatNativeDateModule,
    NgxSliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
