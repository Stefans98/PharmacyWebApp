import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private readonly offerUrl = 'http://localhost:8081/api/offers/'

  constructor(private http: HttpClient) { }

  public createOffer(offer: Offer): Observable<Offer> {
    const body = { id: offer.id, price: offer.price, deliveryDeadline: offer.deliveryDeadline, supplierId: offer.supplierId,
      medicineOrderListId: offer.medicineOrderListId };  

    return this.http
      .post<Offer>(this.offerUrl + 'add', body);
  }
}