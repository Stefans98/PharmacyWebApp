import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({
    providedIn : "root"
})
export class SystemAdministratorService {
    private readonly systemAdministratorUrl = 'http://localhost:8081/api/system-admins/'

    constructor(private http: HttpClient) { }

    public registerSystemAdministrator(user : User): Observable<User> {
        const body = { firstName: user.firstName, lastName: user.lastName, city: user.city, country: user.country,
          street: user.street, email: user.email, password: user.password, phoneNumber: user.phoneNumber
        };  
    
        return this.http
        .post<User>(this.systemAdministratorUrl + 'register', body);
     }

     public updateSysAdmin(user : User): Observable<User> {
      const body = { id: user.id, firstName: user.firstName, lastName: user.lastName, city: user.city, country: user.country,
        street: user.street, email: user.email, password: user.password, phoneNumber: user.phoneNumber
      };  
  
      return this.http
      .post<User>(this.systemAdministratorUrl + 'update', body);
    }

    public getSystemAdministrator(id : number): Observable<User> {
      return this.http.get<User>(this.systemAdministratorUrl + 'findById/' + id);
    }

}