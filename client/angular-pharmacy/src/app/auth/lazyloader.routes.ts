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


export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'patient/pharmacy/all-pharmacies', component: AllPharmaciesComponent },
        { path: 'patient/pharmacy/my-pharmacies', component: MyPharmaciesComponent },
        { path: 'patient/dermatologist/dermatologist-appointment-history', component: DermatologistAppointmentHistoryComponent },
        { path: 'patient/dermatologist/dermatologist-scheduled-appointments', component: DermatologistScheduledAppointmentsComponent },
        { path: 'patient/dermatologist/dermatologist-scheduling', component: DermatologistSchedulingComponent },
        { path: 'patient/pharmacist/pharmacist-counseling-history', component: PharmacistCounselingHistoryComponent },
        { path: 'patient/pharmacist/pharmacist-scheduled-counseling', component: PharmacistScheduledCounselingComponent },
        { path: 'patient/pharmacist/pharmacist-scheduling', component: PharmacistSchedulingComponent },
        { path: 'patient/drugs/reserved-drugs', component: ReservedDrugsComponent },
        { path: 'patient/drugs/dispensed-drugs', component: DispensedDrugsComponent },
        { path: 'patient/drugs/taking-drugs', component: TakingDrugsComponent },
        { path: 'patient/e-prescription', component: EPrescriptionComponent },
        { path: 'patient/penalty', component: PenaltyComponent },
        { path: 'patient/complaints', component: ComplaintsComponent },
        { path: 'patient/patient-profile', component: PatientProfileComponent },
        { path: 'scrumboard', loadChildren: () => import('../scrumboard/scrumboard.module').then(m => m.ScrumboardModule) },
    ]
}];
 
