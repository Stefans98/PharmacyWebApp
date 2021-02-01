import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DermatologistExamination } from '../../models/dermatologist-examination.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AppointmentService {
  private readonly appointmentsUrl = 'http://localhost:8081/api/appointments/'

  constructor(private http: HttpClient) { }

  public getExaminationsHistoryForPatient(patientId: number): Observable<DermatologistExamination[]> {
    return this.http
        .get<DermatologistExamination[]>(this.appointmentsUrl + 'getExaminationsHistoryForPatient/' + patientId);
  } 

}
