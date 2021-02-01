import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineOrderList } from '../../models/medicine-order-list.model';
import { OrderItem } from '../../models/order-item.model';
import { MedicineOrderListService } from '../../services/medicines/medicine-order-list.service';

@Component({
  selector: 'app-medicine-order-lists',
  templateUrl: './medicine-order-lists.component.html',
  styleUrls: ['./medicine-order-lists.component.scss']
})
export class MedicineOrderListsComponent implements OnInit {

  public medicineOrderLists : MedicineOrderList[];
  public medicineOrderItems: OrderItem[];
  public selectedMedicineOrderList : MedicineOrderList;
  public medicineOrderListDataSource : MatTableDataSource<MedicineOrderList>;
  public medicineOrderItemsDataSource : MatTableDataSource<OrderItem>;

  displayedColumnsMedicineOrderList: string[] = ['pharmacyName', 'finalOfferDate', 'pharmacyAddress', 'orderItems'];

  displayedColumnsMedicineOrderItem: string[] = ['code', 'name', 'quantity'];

  constructor(private medicineOrderListService : MedicineOrderListService) {
    this.medicineOrderLists = [];
    this.medicineOrderItems = [];
    this.medicineOrderListDataSource = new MatTableDataSource(this.medicineOrderLists);
    this.medicineOrderItemsDataSource = new MatTableDataSource();
    this.medicineOrderListService.getAllMedicineOrderLists().subscribe(data => {
      this.medicineOrderLists = data;
      this.medicineOrderListDataSource.data = this.medicineOrderLists;
    });
   }

  ngOnInit(): void {
  }

  showOrderItemsClick(row): void {
    this.selectedMedicineOrderList = row;
    this.medicineOrderItemsDataSource.data = this.selectedMedicineOrderList.orderItems;
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '-' + (month > 9 ? '' : '0') + month + '-' +  year;
  }

}
