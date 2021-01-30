import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class DermatologistService {
    private readonly dermatologistUrl = 'http://localhost:8081/api/dermatologist/'
  
    constructor(private http: HttpClient) { }
  
  
    public registerDermatologist(user : User): Observable<User> {
        const body = { firstName: user.firstName, lastName: user.lastName, city: user.city, country: user.country,
          street: user.street, email: user.email, password: user.password, phoneNumber: user.phoneNumber, 
        };  
    
        return this.http
        .post<User>(this.dermatologistUrl + 'register', body);
      }
  }
  