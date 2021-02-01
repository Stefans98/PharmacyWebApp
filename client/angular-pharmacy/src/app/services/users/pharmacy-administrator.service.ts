import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class PharmacyAdministratorService {
    private readonly pharmacyAdministratorUrl = 'http://localhost:8081/api/pharmacy-admins/'
  
    constructor(private http: HttpClient) { }
  
  
    public registerPharmacyAdministrator(user : User, pharmacyId : number): Observable<User> {
        const body = { firstName: user.firstName, lastName: user.lastName, city: user.city, country: user.country,
          street: user.street, email: user.email, password: user.password, phoneNumber: user.phoneNumber, pharmacyId : pharmacyId
        };  
    
        return this.http
        .post<User>(this.pharmacyAdministratorUrl + 'register', body);
      }
  }