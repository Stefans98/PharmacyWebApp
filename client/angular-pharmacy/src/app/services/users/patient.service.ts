import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dermatologist } from '../../models/dermatologist.model';
import { Patient } from '../../models/patient.model';
import { Pharmacist } from '../../models/pharmacist.model';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PatientService {
  private readonly patientUrl = 'http://localhost:8081/api/patients/'

  constructor(private http: HttpClient) { }

  public getPatientById(id: number): Observable<Patient> {
    return this.http
      .get<Patient>(this.patientUrl + 'findById/' + id);
  } 

  public updatePatient(id: number, patient: Patient): Observable<Patient> {
    const body = { id: id, firstName: patient.firstName, lastName: patient.lastName, city: patient.city, country: patient.country,
                 street: patient.street, email: patient.email, password: patient.password, phoneNumber: patient.phoneNumber, 
                points: patient.points, userCategory: patient.userCategory
    };

    return this.http
    .put<Patient>(this.patientUrl + 'updateProfile/' + id, body );
  }

  public getDermatologistsThatExaminedPatient(id: number): Observable<Dermatologist[]> {
    return this.http.get<Dermatologist[]>(this.patientUrl + 'dermatologistsForPatient/' + id);
  }

  public getPharmacistsThatCounseledPatient(id: number): Observable<Pharmacist[]> {
    return this.http.get<Pharmacist[]>(this.patientUrl + 'pharmacistsForPatient/' + id);
  }
}
