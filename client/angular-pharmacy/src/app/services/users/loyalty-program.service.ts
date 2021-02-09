import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoyaltyProgram } from "../../models/loyalty-program.model";

@Injectable({
    providedIn: 'root'
  })

@Injectable()
export class LoyaltyProgramService {
  private readonly loyaltyProgramUrl = 'http://localhost:8081/api/loyalty-program/'

  constructor(private http: HttpClient) { }

  public getLoyaltyProgram(): Observable<LoyaltyProgram> {
    return this.http
      .get<LoyaltyProgram>(this.loyaltyProgramUrl);
  } 

  public defineLoyaltyProgram(loyaltyProgram: LoyaltyProgram): Observable<LoyaltyProgram> {
    const body = { silverPointsBorder : loyaltyProgram.silverPointsBorder, goldPointsBorder : loyaltyProgram.goldPointsBorder, 
        silverCategoryDiscount : loyaltyProgram.silverCategoryDiscount, goldCategoryDiscount : loyaltyProgram.goldCategoryDiscount,
        pointsPerExaminations : loyaltyProgram.pointsPerExaminations, pointsPerCounseling : loyaltyProgram.pointsPerCounseling
    };
    return this.http
    .put<LoyaltyProgram>(this.loyaltyProgramUrl, body );
  }

  public getDiscountByPatientCategory(patientId: number): Observable<number> {
    return this.http
      .get<number>(this.loyaltyProgramUrl + 'getDiscountByPatientCategory/' + patientId);
  } 

}