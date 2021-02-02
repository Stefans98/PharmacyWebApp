import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from '../../../models/offer.model';
import { OfferService } from '../../../services/medicines/offer.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-edit-offer-modal-dialog',
  templateUrl: './edit-offer-modal-dialog.component.html',
  styleUrls: ['./edit-offer-modal-dialog.component.scss']
})
export class EditOfferModalDialogComponent implements OnInit {

  public price : number;
  public deliveryDate : Date;
  public minDate : Date;

  constructor(public dialogRef: MatDialogRef<EditOfferModalDialogComponent>,  private offerService: OfferService, private authService: AuthenticationService, 
                @Inject(MAT_DIALOG_DATA) private offer: Offer) {
    this.minDate = new Date();
    this.price = offer.price;
    this.deliveryDate = new Date(offer.deliveryDeadline);
   }

  ngOnInit(): void {
  }

  editOfferClick(): void {
    const supplierId = this.authService.getLoggedUserId();
    this.offerService.editOffer(new Offer(this.offer.id, this.price, this.deliveryDate, this.offer.offerState, null, this.offer.medicineOrderListId, supplierId))
              .subscribe(data => {
                  this.dialogRef.close({successfull : true});
              });
  }

}
