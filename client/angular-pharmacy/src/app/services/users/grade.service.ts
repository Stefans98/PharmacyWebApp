import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Grade } from "../../models/grade.model";

@Injectable({
    providedIn: 'root'
  })
  export class GradeService {
    private readonly gradeUrl = 'http://localhost:8081/api/grades/'
  
    constructor(private http: HttpClient) { }

    public gradeDermatologist(grade : Grade): Observable<Grade> {
        const body = { id: grade.id, grade: grade.grade, gradeType: grade.gradeType, 
            patientId: grade.patientId, dermatologistId: grade.dermatologistId
        };  
    
        return this.http
            .post<Grade>(this.gradeUrl + 'gradeDermatologist', body);
    }

    public gradePharmacist(grade : Grade): Observable<Grade> {
        const body = { id: grade.id, grade: grade.grade, gradeType: grade.gradeType, 
            patientId: grade.patientId, pharmacistId: grade.pharmacistId
        };  
    
        return this.http
            .post<Grade>(this.gradeUrl + 'gradePharmacist', body);
    }
  
    public gradePharmacy(grade : Grade): Observable<Grade> {
        const body = { id: grade.id, grade: grade.grade, gradeType: grade.gradeType, 
            patientId: grade.patientId, pharmacyId: grade.pharmacyId
        };  
    
        return this.http
            .post<Grade>(this.gradeUrl + 'gradePharmacy', body);
    }

    public gradeMedicine(grade : Grade): Observable<Grade> {
        const body = { id: grade.id, grade: grade.grade, gradeType: grade.gradeType, 
            patientId: grade.patientId, medicineId: grade.medicineId
        };  

        return this.http
            .post<Grade>(this.gradeUrl + 'gradeMedicine', body);
    }

  }