import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PharmacyFull } from "../../models/pharmacy-full.model";
import { Pharmacy } from "../../models/pharmacy.model";


@Injectable({
    providedIn: 'root'
  })
  
@Injectable()
export class PharmacyService{
    
  private readonly pharmacyUrl = 'http://localhost:8081/api/pharmacies/'

  constructor(private http: HttpClient) { }

  public registerPharmacy(pharmacy: Pharmacy): Observable<Pharmacy> {
    const body = { name: pharmacy.name, city: pharmacy.city, country: pharmacy.country,
      street: pharmacy.street, description: pharmacy.description, averageGrade: pharmacy.averageGrade 
    };  

    return this.http
    .post<Pharmacy>(this.pharmacyUrl + 'register', body);
  }

  public getPharmacyByPharmacyAdminId(id: number): Observable<Pharmacy> {
    return this.http
      .get<Pharmacy>(this.pharmacyUrl + 'getPharmacyByPharmacyAdmin/' + id);
  } 

  public getPharmacyByPharmacist(id: number): Observable<Pharmacy> {
    return this.http
      .get<Pharmacy>(this.pharmacyUrl + 'getPharmacyByPharmacist/' + id);
  } 

  public getAllPharmacies(): Observable<Pharmacy[]> {
    return this.http
      .get<Pharmacy[]>(this.pharmacyUrl + 'getAllPharmacies');
  }

  public getPharmaciesForDermatologist(id: number): Observable<Pharmacy[]> {
    return this.http
      .get<Pharmacy[]>(this.pharmacyUrl + 'getPharmaciesByDermatologist/' + id);
  }  

  public getPharmaciesByMedicineId(id: number): Observable<Pharmacy[]> {
    return this.http
      .get<Pharmacy[]>(this.pharmacyUrl + 'getPharmaciesByMedicineId/' + id);
  } 

  public getPharmaciesForPatientAppointmentsAndReservations(patientId: number): Observable<Pharmacy[]> {
    return this.http
    .get<Pharmacy[]>(this.pharmacyUrl + 'getPharmaciesForPatientAppointmentsAndReservations/' + patientId);
  }

  public getPharmacyById(id: number): Observable<Pharmacy> {
    return this.http
      .get<Pharmacy>(this.pharmacyUrl + 'getPharmacyById/' + id);
  } 
  
  public getPharmaciesWithAvailablePharmacistsByDateTime(reservationDate: string, startTime: string, endTime: string): Observable<Pharmacy[]> {
    let params = new HttpParams()
      .set('reservationDate', reservationDate)
      .set('startTime', startTime)
      .set('endTime', endTime);

    return this.http.
      get<Pharmacy[]>(this.pharmacyUrl + 'getPharmaciesWithAvailablePharmacistsByDateTime', { params } );
  }

  public getAllPharmaciesWithMedicine(code : string): Observable<Pharmacy[]> {
    return this.http
      .get<Pharmacy[]>(this.pharmacyUrl + 'getAllWithMedicine/' + code);
  } 

  public updatePharmacy(pharmacy: Pharmacy, lng: number, lat: number): Observable<Pharmacy> {
    const body = { id: pharmacy.id, name: pharmacy.name, city: pharmacy.city, country: pharmacy.country,
      street: pharmacy.street, description: pharmacy.description, averageGrade: pharmacy.averageGrade, longitude: lng, latitude: lat
    };  

    return this.http
    .post<Pharmacy>(this.pharmacyUrl + 'updatePharmacy', body);
  }

  public getPharmacyByFullPharmacyAdminId(id: number): Observable<PharmacyFull> {
    return this.http
      .get<PharmacyFull>(this.pharmacyUrl + 'getPharmacyByPharmacyAdmin/' + id);
  } 

}