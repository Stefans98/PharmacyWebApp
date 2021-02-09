import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component'
import { AllPharmaciesComponent } from '../patient/pharmacy/all-pharmacies/all-pharmacies.component';
import { AllMedicinesComponent } from '../system-administrator/medicines/all-medicines/all-medicines.component';

const routes: Routes = [   
    {path: 'home', component: HomeComponent, children : [
        {path: 'all-pharmacies', component: AllPharmaciesComponent},
        {path: 'all-medicines', component:  AllMedicinesComponent}
    ]},
    {path: 'login', component: LoginComponent},
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    {path: '**', redirectTo: 'home'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class LazyLoadModule { }
