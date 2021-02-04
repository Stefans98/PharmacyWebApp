import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../../models/offer.model';
import { Prescription } from '../../models/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private readonly offerUrl = 'http://localhost:8081/api/prescriptions/'

  constructor(private http: HttpClient) { }

  public savePrescription(medicineId: number, patientId : number, pharmacyId : number, therapyDayLength : number): Observable<Prescription> {
    const body = { medicine : { id : medicineId }, patient : { id : patientId },
     pharmacyId : pharmacyId,  therapyDayLength : therapyDayLength};  

    return this.http
      .post<Prescription>(this.offerUrl + 'savePrescription', body);
  }
}