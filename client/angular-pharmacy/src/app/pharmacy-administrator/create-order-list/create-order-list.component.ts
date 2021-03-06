import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineOrderList } from '../../models/medicine-order-list.model';
import { Medicine } from '../../models/medicine.model';
import { OrderItem } from '../../models/order-item.model';
import { MedicineOrderListService } from '../../services/medicines/medicine-order-list.service';
import { MedicineService } from '../../services/medicines/medicine.service';
import { AuthenticationService } from '../../services/users/authentication.service';

export interface MedicineItem {
    id: number;
    code: string;
    name: string;
    quantity: number;
}

@Component({
  selector: 'app-create-order-list',
  templateUrl: './create-order-list.component.html',
  styleUrls: ['./create-order-list.component.scss']
})

export class CreateOrderListComponent implements OnInit {
  medicines = new FormControl();

  public medicineOrderList: MedicineItem[] = [];
  public medicineList: Medicine[] = [];
  public medicineItemList: MedicineItem[] = [];
  public orderItemListForSending: OrderItem[] = [];
  public medicineOrderListForSending: MedicineOrderList;
  public orderList: MedicineOrderList;
  public offerDeadline: Date;
  public medicineItem: MedicineItem;
  public code: string;
  public name: string;
  public itemQuantity: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public maxDate : Date;

  constructor(private snackBar: MatSnackBar, private medicineService: MedicineService, private medicineOrderListService: MedicineOrderListService, 
              private authService: AuthenticationService) {
    this.medicineService.getAll().subscribe(
      data => {
        this.medicineList = data;
        //
        for(var med of this.medicineList){
          var medItem = {id: med.id, code: med.code, name: med.name, quantity: 1}
          this.medicineItemList.push(medItem);
        }
        //
      }
    );

    this.maxDate = new Date(); 
    //this.quantity = 0;  
  }

  addMedicine(med, quantity1):void{
    for (var med1 of this.medicineOrderList){
      if(med1.name == med.name){
        this.openSnackBar('Lek je već dodat u narudžbenicu!', 'Zatvori');
        return;
      }
    } 
    var medItem = {id: med.id, code: med.code, name: med.name, quantity: quantity1}
    this.medicineOrderList.push(medItem);
  }

  removeMedicine(med, i):void{
    this.medicineOrderList.splice(i, 1);
  }

  sendOrderList(){
    if(this.medicineOrderList == undefined || this.medicineOrderList.length == 0){
      this.openSnackBar('Lista lekova mora biti popunjena!', 'Zatvori');
      return;
    }else if(this.offerDeadline == undefined){
      this.openSnackBar('Datum mora biti unet!', 'Zatvori');
      return;
    } else {
    for(var mItem of this.medicineOrderList){

      var medicine = new Medicine(mItem.id, mItem.code, mItem.name, '', 0, 0, 0, '', 0, false, null);
      var orderItem = new OrderItem(null, medicine, mItem.quantity);

      this.orderItemListForSending.push(orderItem);
    }
    this.medicineOrderListForSending = new MedicineOrderList(0, this.orderItemListForSending, this.offerDeadline, this.authService.getLoggedUserId());
    this.medicineOrderListService.createMedicineOrderList(this.medicineOrderListForSending).subscribe(
      data => {
        this.openSnackBar('Uspešno ste kreirali narudžbenicu!', 'Zatvori');
      }
    );
    }
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
