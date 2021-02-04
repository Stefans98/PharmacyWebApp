import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
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

  public getAvailableExaminationTermsForPharmacy(pharmacyId: number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(this.appointmentsUrl + 'getAvailableExaminationTermsForPharmacy/' + pharmacyId);
  }

  public scheduleExamination(appointment: Appointment): Observable<Appointment> {
    return this.http
      .post<Appointment>(this.appointmentsUrl + 'scheduleExamination', appointment);
  }


}
