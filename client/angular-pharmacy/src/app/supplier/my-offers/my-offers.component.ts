import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Offer } from '../../models/offer.model';
import { OrderItem } from '../../models/order-item.model';
import { OfferService } from '../../services/medicines/offer.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { IssueOfferModalDialogComponent } from '../medicine-order-lists/issue-offer-modal-dialog/issue-offer-modal-dialog.component';
import { EditOfferModalDialogComponent } from './edit-offer-modal-dialog/edit-offer-modal-dialog.component';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  public offers: Offer[];
  public medicineOrderItems: OrderItem[];
  public selectedOffer: Offer;
  public offersDataSouce: MatTableDataSource<Offer>;
  public medicineOrderItemsDataSource : MatTableDataSource<OrderItem>;

  displayedColumns: string[] = ['pharmacyName', 'price', 'deliveryDate', 'state', 'finalOfferDate', 'pharmacyAddress', 'orderItems', 'editOffer'];

  displayedColumnsMedicineOrderItem: string[] = ['code', 'name', 'quantity'];

  constructor(private authService: AuthenticationService, private offerService: OfferService, private dialog : MatDialog, 
                    private snackBar : MatSnackBar) {
    this.offers = [];
    this.medicineOrderItems = [];
    this.offersDataSouce = new MatTableDataSource(this.offers);
    this.medicineOrderItemsDataSource = new MatTableDataSource();
    this.fillTableData();
   }

  fillTableData(): void {
    this.offerService.getOffersForSupplier(this.authService.getLoggedUserId()).subscribe(data => {
      this.offers = data;
      this.offersDataSouce.data = this.offers;
    });
  }

  ngOnInit(): void {
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' +  year;
  }

  parseOfferState(state): string {
    if (state === 'ON_HOLD') {
      return 'Na čekanju';
    } else if (state === 'CONFIRMED') {
      return 'Prihvaćena';
    } else {
      return 'Odbijena';
    }
  }

  showOrderItemsClick(row): void {
    this.selectedOffer = row;
    this.medicineOrderItemsDataSource.data = this.selectedOffer.medicineOrderList.orderItems;
  }

  editOfferClick(row): void {
    this.selectedOffer = row;
    this.medicineOrderItemsDataSource.data = this.selectedOffer.medicineOrderList.orderItems;
    const dialogRef = this.dialog.open(EditOfferModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '350px',
      height: '350px',
      data: this.selectedOffer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.snackBar.open('Ponuda je uspešno izmenjena!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
         this.fillTableData();
      }
    })

  }

}
