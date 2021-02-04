import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComplaintAnswer } from "../../models/complaint-answer.model";
import { Complaint } from "../../models/complaint.model";

@Injectable({
    providedIn: 'root'
  })
  export class ComplaintService {
    private readonly complaintUrl = 'http://localhost:8081/api/complaints/'
  
    constructor(private http: HttpClient) { }

    public getAllComplaints(): Observable<Complaint[]> {
      return this.http.get<Complaint[]>(this.complaintUrl + 'all');
    }
  
    public sendPharmacyComplaint(complaint : Complaint): Observable<Complaint> {
      const body = { id: complaint.id, text: complaint.text, complaintType: complaint.complaintType, 
          patientId: complaint.patientId, pharmacyId: complaint.pharmacyId
      };  
  
      return this.http
      .post<Complaint>(this.complaintUrl + 'sendPharmacyComplaint', body);
    }
  
    public sendDermatologistComplaint(complaint : Complaint): Observable<Complaint> {
        const body = { id: complaint.id, text: complaint.text, complaintType: complaint.complaintType, 
            patientId: complaint.patientId, dermatologistId: complaint.dermatologistId
        };  
    
        return this.http
        .post<Complaint>(this.complaintUrl + 'sendDermatologistComplaint', body);
      }

    public sendPharmacistComplaint(complaint : Complaint): Observable<Complaint> {
      const body = { id: complaint.id, text: complaint.text, complaintType: complaint.complaintType, 
          patientId: complaint.patientId, pharmacistId: complaint.pharmacistId
      };  
  
      return this.http
      .post<Complaint>(this.complaintUrl + 'sendPharmacistComplaint', body);
    }

    public sendComplaintAnswer(complaintAnswer: ComplaintAnswer): Observable<ComplaintAnswer> {
      const body = { id: complaintAnswer.id, text: complaintAnswer.text, complaintId: complaintAnswer.complaintId,complaint: complaintAnswer.complaint}

      return this.http
      .post<ComplaintAnswer>(this.complaintUrl + 'answerComplaint', body);
    }


  }