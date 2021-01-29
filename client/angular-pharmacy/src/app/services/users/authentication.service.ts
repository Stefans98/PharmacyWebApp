import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserToken } from '../../models/user-token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authUrl = 'http://localhost:8081/api/auth/'

  constructor(private http: HttpClient) { }

  public userLogin(email: string, password: string): Observable<UserToken> {
    const body = { email : email, password : password
    };

    return this.http
    .post<UserToken>(this.authUrl + 'login', body);
  }

  public userSignup(patient: Patient): Observable<Patient> {
    const body = { firstName: patient.firstName, lastName: patient.lastName, city: patient.city, country: patient.country,
      street: patient.street, email: patient.email, password: patient.password, phoneNumber: patient.phoneNumber, 
     points: patient.points, userCategory: patient.userCategory
    };  

    return this.http
    .post<Patient>(this.authUrl + 'signupPatient', body);
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token');
    
    if (token == null) {
      return false;
    }

    let jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  public getLoggedUserId(): number {
    return parseInt(localStorage.getItem('userId'));
  }
}