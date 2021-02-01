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
    const body = { finalOfferDate: medicineOrderList.finalOfferDate, orderItems: medicineOrderList.orderItems};  
    return this.http.post<any>(this.medicineOrderListUrl + 'createMedicineOrderList', body);
  }

  public getAllMedicineOrderLists() : Observable<MedicineOrderList[]> {
    return this.http.get<MedicineOrderList[]>(this.medicineOrderListUrl + 'all');
  }
}