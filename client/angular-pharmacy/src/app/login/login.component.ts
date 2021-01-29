import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { Patient } from '../models/patient.model';
import { AuthenticationService } from '../services/users/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public emailLogin : string;
  public passwordLogin : string;
  public firstNameSignup : string;
  public lastNameSignup : string;
  public phoneNumberSignup : string;
  public citySignup : string;
  public countrySignup : string;
  public streetSignup : string;
  public emailSignup : string;
  public passwordSignup : string;
  public repasswordSignup : string;

  constructor(private authService : AuthenticationService, private router : Router, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  loginClick(): void {
    console.log(this.emailLogin);
    this.authService.userLogin(this.emailLogin, this.passwordLogin).subscribe(token => {
      const tokenPayload = decode(token.accessToken);
      localStorage.setItem('token', token.accessToken);
      localStorage.setItem('userId', tokenPayload['userId']);
      localStorage.setItem('email', tokenPayload['sub']);
      localStorage.setItem('userRole', tokenPayload['userRole']);
      if(tokenPayload['userRole'] == 'PATIENT'){
        this.router.navigate(['/auth/patient/pharmacy/all-pharmacies']);
      } else if(tokenPayload['userRole'] == 'DERMATOLOGIST') {
        this.router.navigate(['/auth/dermatologist/work-calendar']);
      }
    }, 
    error => {
      if (error.status == 401)
      {
        this.snackBar.open('Uneli ste neispravan email ili lozinku!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      }
    });
  }

  signupClick(): void {
    this.authService.userSignup(new Patient(0, this.firstNameSignup, this.lastNameSignup, this.citySignup, this.countrySignup,
               this.streetSignup, this.emailSignup, this.phoneNumberSignup, 0, 0, this.passwordSignup)) 
               .subscribe( data => {
                this.snackBar.open('Nalog je uspešno kreiran!', null, { 
                  duration : 3000, 
                  verticalPosition: 'top'
                 });
               });               
  }

}
