import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component'

const routes: Routes = [   
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    {path: '**', redirectTo: 'home'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class LazyLoadModule { }
