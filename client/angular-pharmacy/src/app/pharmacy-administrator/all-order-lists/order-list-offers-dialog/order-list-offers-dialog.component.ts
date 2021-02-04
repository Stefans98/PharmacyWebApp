import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicineOrderList } from '../../../models/medicine-order-list.model';
import { Offer } from '../../../models/offer.model';
import { User } from '../../../models/user.model';
import { OfferService } from '../../../services/medicines/offer.service';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-order-list-offers-dialog',
  templateUrl: './order-list-offers-dialog.component.html',
  styleUrls: ['./order-list-offers-dialog.component.scss']
})
export class OrderListOffersDialogComponent implements OnInit {

  public offersForMedicineOrderList: Offer[];
  public supplier: User;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns = ['price', 'deliveryDeadline', 'offerState', 'accept'];

  constructor(@Inject(MAT_DIALOG_DATA) public medicineOrderList: MedicineOrderList, private offerService: OfferService, private userService: UserService, 
              private authService: AuthenticationService, public dialogRef: MatDialogRef<OrderListOffersDialogComponent>, private snackBar: MatSnackBar) { 
    offerService.getOffersForMedicineOrderList(this.medicineOrderList.id).subscribe(
      data => {
        this.offersForMedicineOrderList = data;
      }
    );

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

  getSupplier(id: number){
    this.userService.getUserById(id).subscribe(
      data => {
        this.supplier = data;
      }
    );
    return this.supplier;
  }

  convertOffer(offer: string){
    if(offer == 'ON_HOLD'){
      return 'NA ČEKANJU';
    } else if(offer == 'CONFIRMED'){
      return 'PRIHVAĆENA';
    } else{
      return 'ODBIJENA';
    }
  }

  acceptOffer(offer){
    this.offerService.acceptOffer(offer, this.authService.getLoggedUserId()).subscribe(
      data => {
        this.offersForMedicineOrderList = data;
      },
      error => {
        if (error.status == 400){
          this.openSnackBar('!!!Nije moguće prihvatiti ponudu!!!Razlozi: - NIJE JOŠ ISTEKAO ROK ZA IZDAVANJE PONUDA - PONUDA JE VEĆ PRIHVAĆENA - NISTE VI KREIRALI OVU NARUDŽBENICU', 'Zatvori');
        }else{
          this.openSnackBar('Uspešno ste prihvatili ponudu za narudžbenicu!', 'Zatvori');
          this.dialogRef.close();
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 30500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['snackbar-class']
    });
  }

}
