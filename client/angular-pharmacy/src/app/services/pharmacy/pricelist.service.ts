import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pricelist } from "../../models/pricelist.model";

@Injectable({
    providedIn: 'root'
  })
  
@Injectable()
export class PricelistService{
    
  private readonly pricelistUrl = 'http://localhost:8081/api/pricelists/'

  constructor(private http: HttpClient) { }

  public getPricelistForPharmacy(pharmacyId: number): Observable<Pricelist> {
    return this.http
      .get<Pricelist>(this.pricelistUrl + 'getPricelistForPharmacy/' + pharmacyId);
  } 

  public updatePricelist(pricelist: Pricelist): Observable<Pricelist> {
    const body = { id: pricelist.id, pharmacy: pricelist.pharmacy, medicinePrices: pricelist.medicinePrices, appointmentPrices: pricelist.appointmentPrices 
    }; 
    return this.http
      .post<Pricelist>(this.pricelistUrl + 'update', body);
  } 
}