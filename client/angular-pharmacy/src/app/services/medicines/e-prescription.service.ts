import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EPrescriptionItem } from '../../models/e-prescription-item.model';
import { EPrescription } from '../../models/e-prescription.model';
import { Offer } from '../../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class EPrescriptionService {

  private readonly epresciptionUrl = 'http://localhost:8081/api/eprescriptions/'

  constructor(private http: HttpClient) { }

  public decodeQrCode(code: File): Observable<EPrescriptionItem[]> {
    const formData = new FormData();

    formData.append('image', code);

    return this.http
      .post<EPrescriptionItem[]>(this.epresciptionUrl + 'read', formData);
  }

  public createNewEPrescription(ePrescription : EPrescription): Observable<EPrescription> {
    const body = { code : null, pharmacyId : ePrescription.pharmacyId,
                    patientId : ePrescription.patientId, price : ePrescription.price, items : ePrescription.items};

    return this.http
    .post<EPrescription>(this.epresciptionUrl + 'create', body);  
  }

  public getAllEPrescriptionsForPatient(id : number) : Observable<EPrescription[]> {
    return this.http
    .get<EPrescription[]>(this.epresciptionUrl + 'getAllForPatient/' + id); 
  }
}