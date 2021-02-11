import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class SupplierService {
    private readonly supplierUrl = 'http://localhost:8081/api/suppliers/'
  
    constructor(private http: HttpClient) { }
  
  
    public registerSupplier(user : User): Observable<User> {
        const body = { firstName: user.firstName, lastName: user.lastName, city: user.city, country: user.country,
          street: user.street, email: user.email, password: user.password, phoneNumber: user.phoneNumber
        };  
    
        return this.http
        .post<User>(this.supplierUrl + 'register', body);
      }

    public updateSupplier(user : User): Observable<User> {
        const body = { id: user.id, firstName: user.firstName, lastName: user.lastName, city: user.city, country: user.country,
          street: user.street, email: user.email, password: user.password, phoneNumber: user.phoneNumber
        };  
    
        return this.http
        .post<User>(this.supplierUrl + 'update', body);
      }

  }