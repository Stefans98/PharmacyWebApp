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
        { path: 'dashboard', component: DashboardCrmComponent, canActivate: [RouteGuardService], data : { role: 'PATIENT'} },
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
        { path: 'dermatologist/work-calendar', component: DermatologistWorkCalendarComponent,  canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/patients', component: DermatologistPatientsComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'} },
        { path: 'dermatologist/start-appointment', component: DermatologistStartAppointmentComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/new-appointment', component: DermatologistNewAppointmentComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/vacation-request', component: DermatologistVacationRequestComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/absence-request', component: DermatologistAbsenceRequestComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
        { path: 'dermatologist/profile', component: DermatologistProfileComponent, canActivate: [RouteGuardService], data : { role: 'DERMATOLOGIST'}  },
    ]
}];
 
