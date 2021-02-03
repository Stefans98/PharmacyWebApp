import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getOccupiedAppointmentsByPatientEmail(patientEmail: string, employeeId: string): Observable<Appointment[]> {
    let params = new HttpParams()
      .set('patientEmail', patientEmail)
      .set('employeeId', employeeId);

    return this.http.
      get<Appointment[]>(this.appointmentsUrl + 'findOccupiedAppointmentsByPatientEmail', { params } );
  }

  public patientNotHeldOnAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http
      .put<Appointment>(this.appointmentsUrl + 'patientNotHeldOnAppointment', appointment);
  }

}
