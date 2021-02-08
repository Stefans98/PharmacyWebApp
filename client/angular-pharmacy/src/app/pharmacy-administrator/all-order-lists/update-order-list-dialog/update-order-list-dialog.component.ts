import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicineOrderList } from '../../../models/medicine-order-list.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Medicine } from '../../../models/medicine.model';
import { OrderItem } from '../../../models/order-item.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { MedicineOrderListService } from '../../../services/medicines/medicine-order-list.service';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { Pharmacy } from '../../../models/pharmacy.model';
import { PharmacistService } from '../../../services/users/pharmacist.service';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';

export interface MedicineItem {
    id: number;
    code: string;
    name: string;
    quantity: number;
    orderItemId: number;
}

@Component({
  selector: 'app-update-order-list-dialog',
  templateUrl: './update-order-list-dialog.component.html',
  styleUrls: ['./update-order-list-dialog.component.scss']
})
export class UpdateOrderListDialogComponent implements OnInit {

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
  public tempMedicineOrderList: MedicineItem[] = [];
  public listAfterUpdate: MedicineOrderList[] = [];
  public pharmacy: Pharmacy;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public maxDate : Date;

  constructor(public dialogRef: MatDialogRef<UpdateOrderListDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MedicineOrderList,
    private snackBar: MatSnackBar, private medicineService: MedicineService, private medicineOrderListService: MedicineOrderListService, 
    private authService: AuthenticationService, private pharmacyService: PharmacyService) {
      
      for(var item of this.data.orderItems){
        this.tempMedicineOrderList.push({id: item.medicine.id, code: item.medicine.code, name: item.medicine.name, quantity: item.quantity, orderItemId: item.id})
      }

      this.offerDeadline = new Date(this.data.finalOfferDate);

      this.medicineService.getAll().subscribe(
        data => {
          this.medicineList = data;
          //
          for(var med of this.medicineList){
            var medItem = {id: med.id, code: med.code, name: med.name, quantity: 1, orderItemId: null}
            this.medicineItemList.push(medItem);
          }
          //
        }
      );
  
      this.maxDate = new Date();
    }

    addMedicine(med, quantity1):void{
      for (var med1 of this.tempMedicineOrderList){
        if(med1.name == med.name){
          this.openSnackBar('Lek je već dodat u narudžbenicu!', 'Zatvori');
          return;
        }
      }
      //this.tempMedicineOrderList.orderItems.push({medicine: med, quantity: quantity1}); 
      var medItem = {id: med.id, code: med.code, name: med.name, quantity: quantity1, orderItemId: null}
      this.tempMedicineOrderList.push(medItem);
    }
  
    removeMedicine(med, i):void{
      //this.tempMedicineOrderList.;
      this.tempMedicineOrderList.splice(i, 1);
    }
  
    sendOrderList(){
      for(var mItem of this.tempMedicineOrderList){
        var medicine = new Medicine(mItem.id, mItem.code, mItem.name, '', 0, 0, 0, '', 0, false, null);
        var orderItem = new OrderItem(mItem.orderItemId, medicine, mItem.quantity);
        this.orderItemListForSending.push(orderItem);
        console.log(mItem.id);
        console.log(mItem.code);
        console.log(mItem.name);
        console.log(mItem.quantity);
        console.log(this.offerDeadline);
        console.log('***********');
      }
      this.medicineOrderListForSending = new MedicineOrderList(this.data.id, this.orderItemListForSending, this.offerDeadline, this.authService.getLoggedUserId());
      this.medicineOrderListService.updateMedicineOrderList(this.medicineOrderListForSending).subscribe(
        data=>{},
        error => {
          if (error.status == 400){
            this.openSnackBarForDeletion('!!!Nije moguće promeniti narudžbenicu!!!Razlozog: - POSTOJE PONUDE ZA NARUDŽBENICU', 'Zatvori');
          }else if(error.status == 200){
            this.openSnackBarForDeletion('Uspešno ste promenili narudžbenicu!', 'Zatvori');
          }
        }
      );

      this.dialogRef.close();

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

    openSnackBarForDeletion(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 30500,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    convertDate(milliseconds : number): string {
      let d = new Date(milliseconds);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate(); 
      return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
    }

}
