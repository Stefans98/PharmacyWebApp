import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnualStatistics } from '../../models/annual-statistics.model';
import { MedicineInquiry } from '../../models/medicine-inquiry.model';
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

  public getMedicinesToWhichPatientIsNotAllergic(patientId: number): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'getMedicinesToWhichPatientIsNotAllergic/' + patientId);
  }
  
  public getMedicinesToWhichPatientIsAllergic(patientId: number): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'getMedicinesToWhichPatientIsAllergic/' + patientId);
  }

  public findMedicinesBy(name: string): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'findMedicinesBy/' + name);
  } 

  public reserveMedicine(medicineReservation: MedicineReservation): Observable<void> {
    const body = { id: medicineReservation.id, finalPurchasingDate: medicineReservation.finalPurchasingDate,
      isCanceled: medicineReservation.isCanceled, medicineId: medicineReservation.medicineId,
      pharmacyId: medicineReservation.pharmacyId, patientId: medicineReservation.patientId };  

    return this.http
      .post<void>(this.medicineUrl + 'reserveMedicine', body);
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

  public cancelMedicineReservation(medicineReservationId: number): Observable<MedicineReservation> {
    return this.http
      .put<MedicineReservation>(this.medicineUrl + 'cancelMedicineReservation',  { id: medicineReservationId });
  }

  public getAllMedicinesForPharmacy(pharmacyId: number): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'findAllMedicinesForPharmacy/' + pharmacyId);
  }  

  public isMedicineAvailable(medicineId : string, pharmacyId: string) : Observable<Medicine> {
    let params = new HttpParams()
      .set('medicineId', medicineId)
      .set('pharmacyId', pharmacyId);

    return this.http.get<Medicine>(this.medicineUrl + 'isMedicineAvailable', { params });
  }

  public getMedicineSubstitutions(medicineId: number): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'getMedicineSubstitutions/' + medicineId);
  }

  public saveMedicineInquiry(pharmacyId: number, employeeId: number, medicineId: number): Observable<void> {
    const body = { pharmacy: { id : pharmacyId}, employee: { id : employeeId }, medicine : { id : medicineId } };  

    return this.http
      .post<void>(this.medicineUrl + 'saveMedicineInquiry', body);
  }

  public findMedicineReservationByUniqueCode(uniqueCode : string, pharmacyId: string) : Observable<MedicineReservation> {
    let params = new HttpParams()
      .set('uniqueCode', uniqueCode)
      .set('pharmacyId', pharmacyId);

    return this.http.get<MedicineReservation>(this.medicineUrl + 'findMedicineReservationByUniqueCode', { params });
  }

  public issueMedicineReservation(medicineReservationId: number): Observable<MedicineReservation> {
    return this.http
      .put<MedicineReservation>(this.medicineUrl + 'issueMedicineReservation/' + medicineReservationId, null);
  }

  public getQuantityOfMedicineForPharmacy(medicineId : string, pharmacyId: string) : Observable<number> {
    let params = new HttpParams()
      .set('medicineId', medicineId)
      .set('pharmacyId', pharmacyId);

    return this.http.get<number>(this.medicineUrl + 'getQuantityOfMedicineForPharmacy', { params });
  }

  public getAllMedicinesNotForPharmacy(pharmacyId: number): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.medicineUrl + 'findAllMedicinesNotForPharmacy/' + pharmacyId);
  }  

  public createMedicine(medicine : Medicine): Observable<Medicine> {
    const body = { name : medicine.name, code : medicine.code, manufacturer : medicine.manufacturer, 
      medicineType : medicine.medicineType, medicineForm : medicine.medicineForm, onPrescription : medicine.onPrescription,
      additionalInformation : medicine.additionalInformation, medicineSpecification : medicine.medicineSpecification  };

    return this.http.post<Medicine>(this.medicineUrl + "save", body);
  }

  public medicineStatistic(pharmacyId: number): Observable<AnnualStatistics> {
    return this.http
        .get<AnnualStatistics>(this.medicineUrl + 'medicineStatistic/' + pharmacyId);
  }
  
  public calculatePharmacyProfit(pharmacyId: number, startDate: string, endDate: string): Observable<AnnualStatistics> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http
        .get<AnnualStatistics>(this.medicineUrl + 'calculatePharmacyProfit/' + pharmacyId, {params});
  }

  public getMedicineInquiriesForPharmacy(pharmacyId: number): Observable<MedicineInquiry[]> {
    return this.http
      .get<MedicineInquiry[]>(this.medicineUrl + 'getMedicineInquiriesForPharmacy/' + pharmacyId);
  }  
}
