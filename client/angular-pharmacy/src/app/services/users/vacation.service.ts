import { HttpClient, HttpParams } from '@angular/common/http';
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
        processed: vacation.processed,
        employeeId : vacation.employeeId,
        pharmacyId : vacation.pharmacyId
    }

    return this.http.post<Vacation>(this.vacationUrl + 'sendVacationRequest', body);
  }

  public getVacationRequestsForDermatologist(pharmacyId: number): Observable<Vacation[]> {
    return this.http
        .get<Vacation[]>(this.vacationUrl + 'getVacationRequestsForDermatologist/' + pharmacyId);
  } 

  public getVacationRequestsForPharmacists(pharmacyId: number): Observable<Vacation[]> {
    return this.http
        .get<Vacation[]>(this.vacationUrl + 'getVacationRequestsForPharmacists/' + pharmacyId);
  } 

  public acceptVacationRequest(vacation: Vacation): Observable<Vacation> {
    const body = {
        id: vacation.id,
        vacationType : vacation.vacationType,
        startTime : vacation.startTime,
        endTime : vacation.endTime,
        processed: vacation.processed,
        employeeId : vacation.employeeId,
        pharmacyId : vacation.pharmacyId
    }

    return this.http.put<Vacation>(this.vacationUrl + 'acceptVacationRequest', body);
  }

  public rejectVacationRequest(text: string, vacation: Vacation): Observable<Vacation> {
    let params = new HttpParams()
      .set('text', text);

    const body = {
      id: vacation.id,
      vacationType : vacation.vacationType,
      startTime : vacation.startTime,
      endTime : vacation.endTime,
      processed: vacation.processed,
      employeeId : vacation.employeeId,
      pharmacyId : vacation.pharmacyId
    }

    return this.http.put<Vacation>(this.vacationUrl + 'rejectVacationRequest/', body, { params });
  }
  
}

