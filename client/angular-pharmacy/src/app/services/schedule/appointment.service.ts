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

  public getCounselingsHistoryForPatient(patientId: number): Observable<DermatologistExamination[]> {
    return this.http
        .get<DermatologistExamination[]>(this.appointmentsUrl + 'getCounselingsHistoryForPatient/' + patientId);
  }
  
  public getScheduledExaminationForPatient(patientId: number): Observable<DermatologistExamination[]> {
    return this.http
        .get<DermatologistExamination[]>(this.appointmentsUrl + 'getScheduledExaminationForPatient/' + patientId);
  } 

  public getScheduledCounselingForPatient(patientId: number): Observable<DermatologistExamination[]> {
    return this.http
        .get<DermatologistExamination[]>(this.appointmentsUrl + 'getScheduledCounselingForPatient/' + patientId);
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

  public getAvailableExaminationTermsForPharmacy(pharmacyId: number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(this.appointmentsUrl + 'getAvailableExaminationTermsForPharmacy/' + pharmacyId);
  }

  public scheduleExamination(appointment: Appointment): Observable<Appointment> {
    return this.http
      .post<Appointment>(this.appointmentsUrl + 'scheduleExamination', appointment);
  }

  public cancelExamination(appointmentId: number): Observable<DermatologistExamination> {
    return this.http
      .put<DermatologistExamination>(this.appointmentsUrl + 'cancelExamination',  { id: appointmentId });
  }

  public getAvailableExaminationTermsForDermatologist(dermatologistId: number, pharmacyId : number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(this.appointmentsUrl + 'getAvailableExaminationTermsForDermatologist/' + dermatologistId + '/' + pharmacyId);
  }

  public getAllAvailableExaminationTermsForDermatologist(dermatologistId: number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(this.appointmentsUrl + 'getAllAvailableExaminationTermsForDermatologist/' + dermatologistId);
  }

  public getAppointmentPrice(reservationDate: string, startTime: string, endTime: string, pharmacyId : string): Observable<number> {
    let params = new HttpParams()
      .set('reservationDate', reservationDate)
      .set('startTime', startTime)
      .set('endTime', endTime)
      .set('pharmacyId', pharmacyId);

    return this.http.
      get<number>(this.appointmentsUrl + 'getAppointmentPrice', { params } );
  }

}
