import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [   
    {path: 'home', component: HomeComponent},
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    //{path: 'login', loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule)},
    {path: '**', redirectTo: 'home'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class LazyLoadModule { }
