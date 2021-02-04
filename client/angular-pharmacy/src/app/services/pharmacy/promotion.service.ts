import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Promotion } from "../../models/promotion.model";

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class PromotionService{
    
  private readonly promotionUrl = 'http://localhost:8081/api/promotions/'

  constructor(private http: HttpClient) { }
  
  public definePromotion(promotion: Promotion, pharmacyId: number): Observable<Promotion> {
    const body = { id: null, text: promotion.text, startTime: promotion.startTime, endTime: promotion.endTime 
    };  

    return this.http
    .post<Promotion>(this.promotionUrl + 'definePromotion/' + pharmacyId, body);
  }

}