import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineOrderList } from '../../models/medicine-order-list.model';
import { Medicine } from '../../models/medicine.model';
import { OrderItem } from '../../models/order-item.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineOrderListService } from '../../services/medicines/medicine-order-list.service';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PharmacistService } from '../../services/users/pharmacist.service';
import { OrderListOffersDialogComponent } from './order-list-offers-dialog/order-list-offers-dialog.component';
import { UpdateOrderListDialogComponent } from './update-order-list-dialog/update-order-list-dialog.component';

export interface MedicineItem {
    id: number;
    code: string;
    name: string;
    quantity: number;
}


@Component({
  selector: 'app-all-order-lists',
  templateUrl: './all-order-lists.component.html',
  styleUrls: ['./all-order-lists.component.scss']
})
export class AllOrderListsComponent implements OnInit {

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
  public pharmacy: Pharmacy;
  public medicineOrderListsForPharmacy: MedicineOrderList[];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public maxDate : Date;

  constructor(private snackBar: MatSnackBar, private medicineService: MedicineService, private medicineOrderListService: MedicineOrderListService, 
              private pharmacyService: PharmacyService, private authService: AuthenticationService, public dialog: MatDialog) {
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

    this.pharmacyService.getPharmacyByPharmacyAdminId(authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.medicineOrderListService.getAllMedicineOrderListsForPharmacy(this.pharmacy.id).subscribe(
          data => {
            this.medicineOrderListsForPharmacy = data;
          }
        );
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
    /*for(var mItem of this.medicineOrderList){
      var medicine = new Medicine(mItem.id, mItem.code, mItem.name, '');
      var orderItem = new OrderItem(medicine, mItem.quantity);
      this.orderItemListForSending.push(orderItem);
      console.log(mItem.id);
      console.log(mItem.code);
      console.log(mItem.name);
      console.log(mItem.quantity);
      console.log(this.offerDeadline);
      console.log('***********');
    }
    //this.medicineOrderListForSending = new MedicineOrderList(0, this.orderItemListForSending, this.offerDeadline);
    this.medicineOrderListService.createMedicineOrderList(this.medicineOrderListForSending).subscribe();*/
  }

  ngOnInit(): void {
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }

  openDialog(medicineOrderList) {
    const dialogRef = this.dialog.open(UpdateOrderListDialogComponent, {
      data: medicineOrderList
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
        data => {
          this.pharmacy = data;
          this.medicineOrderListService.getAllMedicineOrderListsForPharmacy(this.pharmacy.id).subscribe(
            data => {
              this.medicineOrderListsForPharmacy = data;
            }
          );
        }
      );
    });
  }

  openOffers(medicineOrderList) {
    const dialogRef = this.dialog.open(OrderListOffersDialogComponent, {
      data: medicineOrderList
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  deleteMedicineOrderList(medicineOrderList){
    /*medicineOrderList.pharmacyAdministratorId = this.authService.getLoggedUserId();
    this.medicineOrderListService.deleteMedicineOrderList(medicineOrderList).subscribe(
      data=>{},
      error => {
        if (error.status == 400){
          this.openSnackBarForDeletion('!!!Nije moguće obrisali narudžbenicu!!!Razlozog: - POSTOJE PONUDE ZA NARUDŽBENICU', 'Zatvori');
        }else{
          this.openSnackBarForDeletion('Uspešno ste prihvatili obrisali narudžbenicu!', 'Zatvori');
        }
      }
    );*/
  }

}
