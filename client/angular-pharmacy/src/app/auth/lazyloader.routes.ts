import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        //{ path: 'forms', loadChildren: () => import('../forms/forms.module').then(m => m.FormModule) }, //fix this
        { path: 'scrumboard', loadChildren: () => import('../scrumboard/scrumboard.module').then(m => m.ScrumboardModule) },
    ]
}];
 
