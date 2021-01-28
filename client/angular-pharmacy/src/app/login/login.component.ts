import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../services/users/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public email : string;
  public password : string;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  loginClick(email : string, password : string): void {
    this.authService.userLogin(email, password).subscribe(token => {
      const tokenPayload = decode(token.accessToken);
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userId', tokenPayload['userId']);
      localStorage.setItem('email', tokenPayload['sub']);
      localStorage.setItem('userRole', tokenPayload['userRole']);
      if(tokenPayload['userRole'] == 'PATIENT'){
        this.router.navigate(['/auth/patient/pharmacy/all-pharmacies']);
      } else if(tokenPayload['userRole'] == 'DERMATOLOGIST') {
        this.router.navigate(['/auth/dermatologist/work-calendar']);
      }
    });
  }

}
