import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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

  public offers: Offer[] = [];
  public medicineOrderItems: OrderItem[];
  public selectedOffer: Offer;
  public offersDataSouce: MatTableDataSource<Offer>;
  public medicineOrderItemsDataSource : MatTableDataSource<OrderItem>;
  public selectedOfferState: string;

  dataSourceAfterSearch = new MatTableDataSource(this.offers);

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['pharmacyName', 'price', 'deliveryDate', 'state', 'finalOfferDate', 'pharmacyAddress', 'orderItems', 'editOffer'];

  displayedColumnsMedicineOrderItem: string[] = ['code', 'name', 'quantity'];

  offerStates: string[] = ['Na čekanju', 'Prihvaćena', 'Odbijena'];

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

  checkIfOrderIsStillActive(element : Offer) : boolean {
    return element.medicineOrderList.finalOfferDate < new Date();
  }

  applySearch(event: Event) {

    this.setDefaultValuesForFilter();

    this.offersDataSouce = new MatTableDataSource(this.offers);
    this.setFilterPredicate();
    const filter = (event.target as HTMLInputElement).value
    this.offersDataSouce.filter = filter.trim().toLowerCase();
    this.offersDataSouce = new MatTableDataSource(this.offersDataSouce.filteredData);
    this.dataSourceAfterSearch = new MatTableDataSource(this.offersDataSouce.filteredData);
    this.offersDataSouce.sort = this.sort;
  }

  setDefaultValuesForFilter() : void {
    this.selectedOfferState = null;
  }

  setFilterPredicate() {
    this.offersDataSouce.filterPredicate = (data, filter: string) => {
      return data.offerState.toString() === filter; 
    };
  }

  onChangeFilter(value) {

    this.setFilterPredicate();
    this.selectedOfferState = value;
    
    if (value === undefined) {
      this.offersDataSouce.filter = this.dataSourceAfterSearch.filter;
    } else if (this.selectedOfferState == 'Na čekanju') {
      this.offersDataSouce.filter = 'ON_HOLD';
    } else if (this.selectedOfferState == 'Prihvaćena') {
      this.offersDataSouce.filter = 'CONFIRMED';
    }else {
      this.offersDataSouce.filter = 'REJECTED';
    }
  }

}
