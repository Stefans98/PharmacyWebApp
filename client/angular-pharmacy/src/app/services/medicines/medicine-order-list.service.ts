import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MedicineOrderList } from "../../models/medicine-order-list.model";

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class MedicineOrderListService {
  private readonly medicineOrderListUrl = 'http://localhost:8081/api/medicineOrderLists/';

  public medicineOrderList :MedicineOrderList;
  
  constructor(private http: HttpClient) { }

  public createMedicineOrderList(medicineOrderList: MedicineOrderList): Observable<MedicineOrderList> {
    const body = { finalOfferDate: medicineOrderList.finalOfferDate, orderItems: medicineOrderList.orderItems, pharmacyAdministratorId : medicineOrderList.pharmacyAdministratorId};  
    return this.http.post<any>(this.medicineOrderListUrl + 'createMedicineOrderList', body);
  }

  public getAllMedicineOrderLists() : Observable<MedicineOrderList[]> {
    return this.http.get<MedicineOrderList[]>(this.medicineOrderListUrl + 'allActive');
  }

  public getAllMedicineOrderListsForPharmacy(id: number) : Observable<MedicineOrderList[]>{
    return this.http.get<MedicineOrderList[]>(this.medicineOrderListUrl + 'getMedicineOrderListsForPharmacy/' + id);
  }

  public updateMedicineOrderList(medicineOrderList: MedicineOrderList): Observable<MedicineOrderList> {
    const body = {id: medicineOrderList.id, finalOfferDate: medicineOrderList.finalOfferDate, orderItems: medicineOrderList.orderItems, pharmacyAdministratorId : medicineOrderList.pharmacyAdministratorId};  
    return this.http.put<any>(this.medicineOrderListUrl + 'updateMedicineOrderList', body);
  }

  public deleteMedicineOrderList(medicineOrderList: MedicineOrderList): Observable<MedicineOrderList> {
    const body = {id: medicineOrderList.id, finalOfferDate: medicineOrderList.finalOfferDate, orderItems: medicineOrderList.orderItems, pharmacyAdministratorId : medicineOrderList.pharmacyAdministratorId};  
    return this.http.put<any>(this.medicineOrderListUrl + 'deleteMedicineOrderList', body);
  }

  public getWaitingOffersMedicineOrderListsForPharmacy(id: number) : Observable<MedicineOrderList[]>{
    return this.http.get<MedicineOrderList[]>(this.medicineOrderListUrl + 'getWaitingOffersMedicineOrderListsForPharmacy/' + id);
  }

  public getDoneMedicineOrderListsForPharmacy(id: number) : Observable<MedicineOrderList[]>{
    return this.http.get<MedicineOrderList[]>(this.medicineOrderListUrl + 'getDoneMedicineOrderListsForPharmacy/' + id);
  }
  
}