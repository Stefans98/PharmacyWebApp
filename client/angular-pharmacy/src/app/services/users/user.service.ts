import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
