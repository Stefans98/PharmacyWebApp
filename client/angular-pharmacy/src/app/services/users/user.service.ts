import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResetPassword } from '../../models/reset-password.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly userUrl = 'http://localhost:8081/api/users/'

  constructor(private http: HttpClient) { }

  public getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(this.userUrl + 'findById/' + id);
  } 

  public getPasswordResetDataForUser(userId: number): Observable<ResetPassword> {
    return this.http
      .get<ResetPassword>(this.userUrl + 'getPasswordResetDataForUser/' + userId);
  } 

}

