import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PharmacyMedicine } from "../../models/pharmacy-medicine.model";

@Injectable({
    providedIn: 'root'
  })
  export class PharmacyMedicineService {
    private readonly pharmacyMedicineUrl = 'http://localhost:8081/api/pharmacyMedicines/'

    constructor(private http: HttpClient) { }

    public getMedicinesForPharmacy(pharmacyId: number): Observable<PharmacyMedicine[]> {
        return this.http
          .get<PharmacyMedicine[]>(this.pharmacyMedicineUrl + 'getMedicinesForPharmacy/' + pharmacyId);
    }

    public addPharmacyMedicine(pharmacyMedicine: PharmacyMedicine): Observable<PharmacyMedicine> {
        const body = { id: pharmacyMedicine.id, medicine: pharmacyMedicine.medicine, pharmacy: pharmacyMedicine.pharmacy, quantity: pharmacyMedicine.quantity };  
    
        return this.http
          .post<PharmacyMedicine>(this.pharmacyMedicineUrl + 'addPharmacyMedicine', body);
      }

    public deletePharmacyMedicine(pharmacyMedicine: PharmacyMedicine, pharmacyId:number): Observable<PharmacyMedicine> {
    const body = { id: pharmacyMedicine.id, medicine: pharmacyMedicine.medicine, pharmacy: pharmacyMedicine.pharmacy, quantity: pharmacyMedicine.quantity };  

    return this.http
        .put<PharmacyMedicine>(this.pharmacyMedicineUrl + 'deletePharmacyMedicine/' + pharmacyId, body);
    }
  }