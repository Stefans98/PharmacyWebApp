import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserToken } from '../../models/user-token.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = 'http://localhost:8081/api/auth/'

  constructor(private http: HttpClient) { }

  public userLogin(email: string, password: string): Observable<UserToken> {
    const body = { email : email, password : password
    };

    return this.http
    .post<UserToken>(this.authUrl + 'login', body);
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token');
    
    if (token == null) {
      return false;
    }

    let jwtHelper = new JwtHelperService();
    if (jwtHelper.isTokenExpired(token)){
        this.logout();
    }
    return !jwtHelper.isTokenExpired(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }
}