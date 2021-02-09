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

  public editOffer(offer: Offer): Observable<Offer> {
    const body = { id: offer.id, price: offer.price, deliveryDeadline: offer.deliveryDeadline, supplierId: offer.supplierId,
      medicineOrderListId: offer.medicineOrderListId };  

    return this.http
      .put<Offer>(this.offerUrl + 'edit/' + offer.id, body);
  }

  public getOffersForSupplier(supplierId: number): Observable<Offer[]> {
    return this.http
      .get<Offer[]>(this.offerUrl + 'getOffersForSupplier/' + supplierId); 
  }

  public getOffersForMedicineOrderList(medicineOrderListId: number): Observable<Offer[]> {
    return this.http
      .get<Offer[]>(this.offerUrl + 'getOffersForMedicineOrderList/' + medicineOrderListId); 
  }

  public acceptOffer(offer: Offer, pharmacyAdministratorId: number): Observable<Offer[]> {
    const body = { id: offer.id, price: offer.price, deliveryDeadline: offer.deliveryDeadline, supplierId: offer.supplierId,
      medicineOrderListId: offer.medicineOrderListId };  

    return this.http
      .put<Offer[]>(this.offerUrl + 'acceptOffer/' + pharmacyAdministratorId, body);
  }
}