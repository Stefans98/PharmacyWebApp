import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../../models/medicine.model';

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
}
