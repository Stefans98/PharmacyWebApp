import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AllPharmaciesComponent } from '../patient/pharmacy/all-pharmacies/all-pharmacies.component';
import { MyPharmaciesComponent } from '../patient/pharmacy/my-pharmacies/my-pharmacies.component';
import { DermatologistAppointmentHistoryComponent } from '../patient/dermatologist/dermatologist-appointment-history/dermatologist-appointment-history.component';
import { DermatologistScheduledAppointmentsComponent } from '../patient/dermatologist/dermatologist-scheduled-appointments/dermatologist-scheduled-appointments.component';
import { DermatologistSchedulingComponent } from '../patient/dermatologist/dermatologist-scheduling/dermatologist-scheduling.component';
import { PatientProfileComponent } from '../patient/patient-profile/patient-profile.component';
import { PharmacistCounselingHistoryComponent } from '../patient/pharmacist/pharmacist-counseling-history/pharmacist-counseling-history.component';
import { PharmacistScheduledCounselingComponent } from '../patient/pharmacist/pharmacist-scheduled-counseling/pharmacist-scheduled-counseling.component';
import { PharmacistSchedulingComponent } from '../patient/pharmacist/pharmacist-scheduling/pharmacist-scheduling.component';
import { ReservedDrugsComponent } from '../patient/drugs/reserved-drugs/reserved-drugs.component';
import { DispensedDrugsComponent } from '../patient/drugs/dispensed-drugs/dispensed-drugs.component';
import { TakingDrugsComponent } from '../patient/drugs/taking-drugs/taking-drugs.component';
import { EPrescriptionComponent } from '../patient/e-prescription/e-prescription.component';
import { PenaltyComponent } from '../patient/penalty/penalty.component';
import { ComplaintsComponent } from '../patient/complaints/complaints.component';
import { DermatologistWorkCalendarComponent } from '../dermatologist/dermatologist-work-calendar/dermatologist-work-calendar.component';
import { DermatologistPatientsComponent } from '../dermatologist/dermatologist-patients/dermatologist-patients.component';
import { DermatologistStartAppointmentComponent } from '../dermatologist/dermatologist-start-appointment/dermatologist-start-appointment.component';
import { DermatologistNewAppointmentComponent } from '../dermatologist/dermatologist-new-appointment/dermatologist-new-appointment.component';
import { DermatologistVacationRequestComponent } from '../dermatologist/dermatologist-vacation-request/dermatologist-vacation-request.component';
import { DermatologistAbsenceRequestComponent } from '../dermatologist/dermatologist-absence-request/dermatologist-absence-request.component';
import { DermatologistProfileComponent } from '../dermatologist/dermatologist-profile/dermatologist-profile.component';
import { PharmacyAdministratorMyPharmacyComponent } from '../pharmacy-administrator/pharmacy-administrator-my-pharmacy/pharmacy-administrator-my-pharmacy.component';
import { FreeAppointmentsComponent } from '../pharmacy-administrator/free-appointments/free-appointments.component';
import { BusinessReportComponent } from '../pharmacy-administrator/business-report/business-report.component';
import { AllAvailableMedicinesComponent } from '../pharmacy-administrator/all-available-medicines/all-available-medicines.component';
import { AddMedicineComponent } from '../pharmacy-administrator/add-medicine/add-medicine.component';
import { RequestForMedicinesComponent } from '../pharmacy-administrator/request-for-medicines/request-for-medicines.component';
import { AllPharmacistsComponent } from '../pharmacy-administrator/all-pharmacists/all-pharmacists.component';
import { AddPharmacistComponent } from '../pharmacy-administrator/add-pharmacist/add-pharmacist.component';
import { AllDermatologistsComponent } from '../pharmacy-administrator/all-dermatologists/all-dermatologists.component';
import { AddDermatologistComponent } from '../pharmacy-administrator/add-dermatologist/add-dermatologist.component';
import { AllOrderListsComponent } from '../pharmacy-administrator/all-order-lists/all-order-lists.component';
import { CreateOrderListComponent } from '../pharmacy-administrator/create-order-list/create-order-list.component';
import { PharmacyRegistrationComponent } from '../system-administrator/pharmacy-registration/pharmacy-registration.component';
import { DermatologistRegistrationComponent } from '../system-administrator/dermatologist-registration/dermatologist-registration.component';
import { PharmacyAdministratorRegistrationComponent } from '../system-administrator/pharmacy-administrator-registration/pharmacy-administrator-registration.component';
import { SystemAdministratorRegistrationComponent } from '../system-administrator/system-administrator-registration/system-administrator-registration.component';
import { SupplierRegistrationComponent } from '../system-administrator/supplier-registration/supplier-registration.component';
import { LoyaltyProgramComponent } from '../system-administrator/loyalty-program/loyalty-program.component';
import { AnswerComplaintsComponent } from '../system-administrator/answer-complaints/answer-complaints.component';
import { RouteGuardService } from '../services/users/route-guard.service';
import { PharmacistWorkCalendarComponent } from '../pharmacist/pharmacist-work-calendar/pharmacist-work-calendar.component';
import { PharmacistPatientsComponent } from '../pharmacist/pharmacist-patients/pharmacist-patients.component';
import { PharmacistStartAppointmentComponent } from '../pharmacist/pharmacist-start-appointment/pharmacist-start-appointment.component';
import { PharmacistNewAppointmentComponent } from '../pharmacist/pharmacist-new-appointment/pharmacist-new-appointment.component';
import { PharmacistAbsenceRequestComponent } from '../pharmacist/pharmacist-absence-request/pharmacist-absence-request.component';
import { PharmacistVacationRequestComponent } from '../pharmacist/pharmacist-vacation-request/pharmacist-vacation-request.component';
import { PharmacistProfileComponent } from '../pharmacist/pharmacist-profile/pharmacist-profile.component';
import { PharmacistMedicineIssueComponent } from '../pharmacist/pharmacist-medicine-issue/pharmacist-medicine-issue.component';
import { MedicineOrderListsComponent } from '../supplier/medicine-order-lists/medicine-order-lists.component';
import { MyOffersComponent } from '../supplier/my-offers/my-offers.component';
import { SupplierProfileComponent } from '../supplier/supplier-profile/supplier-profile.component';
import { PharmacyProfileComponent } from '../pharmacy-profile/pharmacy-profile.component';
import { DefinePromotionComponent } from '../pharmacy-administrator/define-promotion/define-promotion.component';
import { VacationRequestComponent } from '../pharmacy-administrator/all-dermatologists/vacation-request/vacation-request.component';
import { VacationRequestPharmacistsComponent } from '../pharmacy-administrator/all-pharmacists/vacation-request-pharmacists/vacation-request-pharmacists.component';
import { PharmacyAdministratorProfileComponent } from '../pharmacy-administrator/pharmacy-administrator-profile/pharmacy-administrator-profile.component';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [

        { path: 'patient/pharmacy/all-pharmacies', component: AllPharmaciesComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacy/my-pharmacies', component: MyPharmaciesComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/dermatologist/dermatologist-appointment-history', component: DermatologistAppointmentHistoryComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/dermatologist/dermatologist-scheduled-appointments', component: DermatologistScheduledAppointmentsComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/dermatologist/dermatologist-scheduling', component: DermatologistSchedulingComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacist/pharmacist-counseling-history', component: PharmacistCounselingHistoryComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacist/pharmacist-scheduled-counseling', component: PharmacistScheduledCounselingComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacist/pharmacist-scheduling', component: PharmacistSchedulingComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/drugs/reserved-drugs', component: ReservedDrugsComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/drugs/dispensed-drugs', component: DispensedDrugsComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/drugs/taking-drugs', component: TakingDrugsComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/e-prescription', component: EPrescriptionComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/penalty', component: PenaltyComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/complaints', component: ComplaintsComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/patient-profile', component: PatientProfileComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'pharmacist/work-calendar', component: PharmacistWorkCalendarComponent,  canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'pharmacist/patients', component: PharmacistPatientsComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'} },
        { path: 'pharmacist/start-appointment', component: PharmacistStartAppointmentComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'pharmacist/new-appointment', component: PharmacistNewAppointmentComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'pharmacist/vacation-request', component: PharmacistVacationRequestComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'pharmacist/absence-request', component: PharmacistAbsenceRequestComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'pharmacist/profile', component: PharmacistProfileComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'pharmacist/medicine-issue', component: PharmacistMedicineIssueComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACIST'}  },
        { path: 'dermatologist/work-calendar', component: DermatologistWorkCalendarComponent,  canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/patients', component: DermatologistPatientsComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'} },
        { path: 'dermatologist/start-appointment', component: DermatologistStartAppointmentComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/new-appointment', component: DermatologistNewAppointmentComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/vacation-request', component: DermatologistVacationRequestComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/absence-request', component: DermatologistAbsenceRequestComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/profile', component: DermatologistProfileComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'pharmacy-administrator/my-pharmacy', component: PharmacyAdministratorMyPharmacyComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/free-appointments', component: FreeAppointmentsComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/business-report', component: BusinessReportComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/all-available-medicines', component: AllAvailableMedicinesComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/add-medicine', component: AddMedicineComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/request-for-medicines', component: RequestForMedicinesComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/all-pharmacists', component: AllPharmacistsComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/add-pharmacist', component: AddPharmacistComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/all-dermatologists', component: AllDermatologistsComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/add-dermatologist', component: AddDermatologistComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/all-order-lists', component: AllOrderListsComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/create-order-list', component: CreateOrderListComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'system-administrator/pharmacy-registration', component: PharmacyRegistrationComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'system-administrator/dermatologist-registration', component: DermatologistRegistrationComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'system-administrator/pharmacy-administrator-registration', component: PharmacyAdministratorRegistrationComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'system-administrator/system-administrator-registration', component: SystemAdministratorRegistrationComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'system-administrator/supplier-registration', component: SupplierRegistrationComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'system-administrator/complaints', component:  AnswerComplaintsComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'system-administrator/loyalty-program', component:  LoyaltyProgramComponent, canActivate: [RouteGuardService], data : { role: 'SYSTEM_ADMIN'} },
        { path: 'supplier/medicine-order-lists', component:  MedicineOrderListsComponent, canActivate: [RouteGuardService], data : { role: 'SUPPLIER'} },
        { path: 'supplier/my-offers', component:  MyOffersComponent, canActivate: [RouteGuardService], data : { role: 'SUPPLIER'} },
        { path: 'supplier/supplier-profile', component:  SupplierProfileComponent, canActivate: [RouteGuardService], data : { role: 'SUPPLIER'} },
        { path: 'pharmacy-administrator/pharmacy-profile', component:  PharmacyProfileComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/define-promotion', component:  DefinePromotionComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/request-vacation-dermatologists', component:  VacationRequestComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/request-vacation-pharmacists', component:  VacationRequestPharmacistsComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} },
        { path: 'pharmacy-administrator/pharmacy-administrator-profile', component:  PharmacyAdministratorProfileComponent, canActivate: [RouteGuardService], data : { role: 'PHARMACY_ADMIN'} }
    ]
}];
 
