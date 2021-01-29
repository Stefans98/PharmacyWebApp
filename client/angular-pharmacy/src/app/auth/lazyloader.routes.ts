import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
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
import { RouteGuardService } from '../services/users/route-guard.service';


export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacy/all-pharmacies', component: AllPharmaciesComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacy/my-pharmacies', component: MyPharmaciesComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/dermatologist/dermatologist-appointment-history', component: DermatologistAppointmentHistoryComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/dermatologist/dermatologist-scheduled-appointments', component: DermatologistScheduledAppointmentsComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/dermatologist/dermatologist-scheduling', component: DermatologistSchedulingComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacist/pharmacist-counseling-history', component: PharmacistCounselingHistoryComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacist/pharmacist-scheduled-counseling', component: PharmacistScheduledCounselingComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/pharmacist/pharmacist-scheduling', component: PharmacistSchedulingComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/drugs/reserved-drugs', component: ReservedDrugsComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/drugs/dispensed-drugs', component: DispensedDrugsComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/drugs/taking-drugs', component: TakingDrugsComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/e-prescription', component: EPrescriptionComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/penalty', component: PenaltyComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/complaints', component: ComplaintsComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'patient/patient-profile', component: PatientProfileComponent, canLoad: [RouteGuardService], data : { role: 'PATIENT'} },
        { path: 'dermatologist/work-calendar', component: DermatologistWorkCalendarComponent,  canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/patients', component: DermatologistPatientsComponent, canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'} },
        { path: 'dermatologist/start-appointment', component: DermatologistStartAppointmentComponent, canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/new-appointment', component: DermatologistNewAppointmentComponent, canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/vacation-request', component: DermatologistVacationRequestComponent, canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/absence-request', component: DermatologistAbsenceRequestComponent, canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/profile', component: DermatologistProfileComponent, canLoad: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
    ]
}];
 
