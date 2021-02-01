import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from '../../../models/offer.model';
import { OfferService } from '../../../services/medicines/offer.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-issue-offer-modal-dialog',
  templateUrl: './issue-offer-modal-dialog.component.html',
  styleUrls: ['./issue-offer-modal-dialog.component.scss']
})
export class IssueOfferModalDialogComponent implements OnInit {

  public price : number;
  public deliveryDate : Date;
  public minDate : Date;

  constructor(public dialogRef: MatDialogRef<IssueOfferModalDialogComponent>,  private offerService: OfferService, private authService: AuthenticationService, 
                @Inject(MAT_DIALOG_DATA) private medicineOrderListId: number) {
    this.minDate = new Date();
   }

  ngOnInit(): void {
  }

  sendOfferClick(): void {
    const supplierId = this.authService.getLoggedUserId();
    this.offerService.createOffer(new Offer(0, this.price, this.deliveryDate, null, this.medicineOrderListId, supplierId))
              .subscribe(data => {
                  this.dialogRef.close({successfull : true});
              });
  }
}
