import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacation } from '../../models/vacation.model';

@Injectable({
  providedIn: 'root'
})

export class VacationService {
  private readonly vacationUrl = 'http://localhost:8081/api/vacations/'

  constructor(private http: HttpClient) { }

  public sendVacationRequest(vacation: Vacation): Observable<Vacation> {
    const body = {
        vacationType : vacation.vacationType,
        startTime : vacation.startTime,
        endTime : vacation.endTime,
        employeeId : vacation.employeeId,
        pharmacyId : vacation.pharmacyId
    }

    return this.http.post<Vacation>(this.vacationUrl + 'sendVacationRequest', body);
  }
  
}

