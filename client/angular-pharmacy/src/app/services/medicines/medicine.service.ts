import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../../models/medicine.model';
import { MedicineReservation } from '../../models/medicineReservation.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private readonly medicineUrl = 'http://localhost:8081/api/medicines/'

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'getAll');
  } 

  public findMedicinesBy(name: string): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'findMedicinesBy/' + name);
  } 

  public reserveMedicine(medicineReservation: MedicineReservation): Observable<MedicineReservation> {
    const body = { id: medicineReservation.id, finalPurchasingDate: medicineReservation.finalPurchasingDate,
      isCanceled: medicineReservation.isCanceled, medicineId: medicineReservation.medicineId,
      pharmacyId: medicineReservation.pharmacyId, patientId: medicineReservation.patientId };  

    return this.http
      .post<MedicineReservation>(this.medicineUrl + 'reserveMedicine', body);
  }

  public getAllReservedMedicinesByPatientId(patientId: number): Observable<MedicineReservation[]> {
    return this.http
      .get<MedicineReservation[]>(this.medicineUrl + 'getAllReservedMedicinesByPatientId/' + patientId);
  }  

  public getMedicinePrice(medicineId: string, pharmacyId: string): Observable<DoubleRange> {
    
    let params = new HttpParams()
      .set('medicineId', medicineId)
      .set('pharmacyId', pharmacyId);

    return this.http.
      get(this.medicineUrl + 'getMedicinePrice/medicinePrice', { params } );
  }
}
