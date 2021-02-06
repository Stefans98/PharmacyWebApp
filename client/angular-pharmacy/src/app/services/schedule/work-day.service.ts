import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkDay } from '../../models/work-day.model';

@Injectable({
  providedIn: 'root'
})
export class WorkDayService {
  private readonly medicineUrl = 'http://localhost:8081/api/workdays/'

  constructor(private http: HttpClient) { }

  public getWorkDayInPharmacyByDateAndEmployeeId(date: string, employeeId: string, pharmacyId: string): Observable<WorkDay> {
    let params = new HttpParams()
      .set('date', date)
      .set('employeeId', employeeId)
      .set('pharmacyId', pharmacyId);

    return this.http.
      get<WorkDay>(this.medicineUrl + 'getWorkDayInPharmacyByDateAndEmployeeId', { params } );
  }
}
