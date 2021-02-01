import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

  public getPharmaciesByMedicineId(id: number): Observable<Pharmacy[]> {
    return this.http
      .get<Pharmacy[]>(this.pharmacyUrl + 'getPharmaciesByMedicineId/' + id);
  } 

  public getAllPharmacies(): Observable<Pharmacy[]> {
    return this.http
      .get<Pharmacy[]>(this.pharmacyUrl + 'getAllPharmacies');
  } 
}