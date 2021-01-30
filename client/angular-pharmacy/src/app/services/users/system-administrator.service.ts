import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({
    providedIn : "root"
})
export class SystemAdministratorService {
    private readonly patientUrl = 'http://localhost:8081/api/system-admin/'

    constructor(private http: HttpClient) { }

}