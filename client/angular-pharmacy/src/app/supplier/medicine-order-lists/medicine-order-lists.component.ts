import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineOrderList } from '../../models/medicine-order-list.model';
import { OrderItem } from '../../models/order-item.model';
import { ResetPassword } from '../../models/reset-password.model';
import { MedicineOrderListService } from '../../services/medicines/medicine-order-list.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { UserService } from '../../services/users/user.service';
import { IssueOfferModalDialogComponent } from './issue-offer-modal-dialog/issue-offer-modal-dialog.component';
import { SupplierPasswordChangeModalDialogComponent } from './supplier-password-change-modal-dialog/supplier-password-change-modal-dialog.component';

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

  public resetPasswordData : ResetPassword;

  displayedColumnsMedicineOrderList: string[] = ['pharmacyName', 'finalOfferDate', 'pharmacyAddress', 'orderItems', 'issueOffer'];

  displayedColumnsMedicineOrderItem: string[] = ['code', 'name', 'quantity'];

  constructor(private medicineOrderListService : MedicineOrderListService, private dialog : MatDialog, 
    private snackBar : MatSnackBar, private userService : UserService, private authenticationService : AuthenticationService) {
    this.userService.getPasswordResetDataForUser(authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.resetPasswordData = data;
        this.medicineOrderLists = [];
        this.medicineOrderItems = [];
        this.medicineOrderListDataSource = new MatTableDataSource(this.medicineOrderLists);
        this.medicineOrderItemsDataSource = new MatTableDataSource();
        this.medicineOrderListService.getAllMedicineOrderLists().subscribe(data => {
          this.medicineOrderLists = data;
          this.medicineOrderListDataSource.data = this.medicineOrderLists;
        });
        if(this.resetPasswordData.passwordReset == false) { // First login
          let dialogRef = this.dialog.open(SupplierPasswordChangeModalDialogComponent,{
            panelClass: 'my-centered-dialog',
            width: '550px',
            height: '365px',
            disableClose: true
          });
        }
      });
   }

  ngOnInit(): void {
  }

  showOrderItemsClick(row): void {
    this.selectedMedicineOrderList = row;
    this.medicineOrderItemsDataSource.data = this.selectedMedicineOrderList.orderItems;
  }

  issueOfferClick(row): void {
    this.selectedMedicineOrderList = row;
    this.medicineOrderItemsDataSource.data = this.selectedMedicineOrderList.orderItems;
    const dialogRef = this.dialog.open(IssueOfferModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '350px',
      height: '350px',
      data: this.selectedMedicineOrderList
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.snackBar.open('Vaša ponuda je poslata!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      }
    })
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' +  year;
  }

}
