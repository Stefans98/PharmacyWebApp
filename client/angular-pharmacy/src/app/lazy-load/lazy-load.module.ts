import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [   
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    //{path: 'login', loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule)},
    {path: '**', redirectTo: 'auth/dashboard'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class LazyLoadModule { }
