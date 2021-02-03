import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Complaint } from "../../models/complaint.model";

@Injectable({
    providedIn: 'root'
  })
  export class ComplaintService {
    private readonly complaintUrl = 'http://localhost:8081/api/complaints/'
  
    constructor(private http: HttpClient) { }
  
  
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

  }