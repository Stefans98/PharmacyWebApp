import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subscription } from "../../models/subscription.model";

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class SubscriptionService{
    
  private readonly subscriptionUrl = 'http://localhost:8081/api/subscriptions/'

  constructor(private http: HttpClient) { }
  
  public subscribeToPharmacy(subscription: Subscription): Observable<Subscription> {
    const body = { pharmacyId : subscription.pharmacyId, patientId : subscription.patientId }

    return this.http.post<Subscription>(this.subscriptionUrl + 'subscribe', body);
  }  

  public getAllSubscriptionsForPatient(patientId: number): Observable<Subscription[]> {

    return this.http
    .get<Subscription[]>(this.subscriptionUrl + 'getAllForPatient/' + patientId);
  }

  public unsubscribeToPharmacy(subscriptionId: number): Observable<any> {
    const body = { id : subscriptionId }

    return this.http.put(this.subscriptionUrl + 'unsubscribe', body);
  }

}