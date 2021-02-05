import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { Pharmacist } from '../../models/pharmacist.model';
import { Pharmacy } from '../../models/pharmacy.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PharmacistService {
  private readonly pharmacistUrl = 'http://localhost:8081/api/pharmacists/'

  constructor(private http: HttpClient) { }

  public getPharmacistById(id: number): Observable<Pharmacist> {
    return this.http
        .get<Pharmacist>(this.pharmacistUrl + 'findById/' + id);
  } 

  public updatePharmacist(id: number, pharmacist: Pharmacist): Observable<Pharmacist> {
    const body = { id: id, firstName: pharmacist.firstName, lastName: pharmacist.lastName, city: pharmacist.city, country: pharmacist.country,
                 street: pharmacist.street, email: pharmacist.email, password: pharmacist.password, phoneNumber: pharmacist.phoneNumber, averageGrade: pharmacist.averageGrade
    };

    return this.http
        .put<Pharmacist>(this.pharmacistUrl + 'updateProfile/' + id, body);
  }

  public getPharmacyForPharmacist(pharmacistId: number): Observable<Pharmacy> {
    return this.http
        .get<Pharmacy>(this.pharmacistUrl + 'pharmacyForPharmacist/' + pharmacistId);
  } 

  public getPharmacistsForPharmacy(pharmacyId: number): Observable<Pharmacist[]>{
    return this.http
        .get<Pharmacist[]>(this.pharmacistUrl + 'getPharmacistsForPharmacy/' + pharmacyId);
  }
    
  public getAvailablePharmacistsForPharmacy(reservationDate: string, startTime: string, endTime: string, pharmacyId: string): Observable<Pharmacist[]> {
    let params = new HttpParams()
      .set('reservationDate', reservationDate)
      .set('startTime', startTime)
      .set('endTime', endTime)
      .set('pharmacyId', pharmacyId);

    return this.http.
      get<Pharmacist[]>(this.pharmacistUrl + 'getAvailablePharmacistsForPharmacy', { params } );
  }

  public getPatientsForPharmacist(pharmacistId: number): Observable<Patient[]> {
    return this.http
        .get<Patient[]>(this.pharmacistUrl + 'patientsForPharmacist/' + pharmacistId);
  } 
}
