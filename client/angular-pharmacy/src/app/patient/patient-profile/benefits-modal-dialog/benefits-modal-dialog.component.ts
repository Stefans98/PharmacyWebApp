import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { LoyaltyProgramService } from '../../../services/users/loyalty-program.service';

@Component({
  selector: 'app-benefits-modal-dialog',
  templateUrl: './benefits-modal-dialog.component.html',
  styleUrls: ['./benefits-modal-dialog.component.scss']
})
export class BenefitsModalDialogComponent implements OnInit {

  public discount: number;

  constructor(private loyaltyProgramService: LoyaltyProgramService, private authenticationService: AuthenticationService) { 
    this.loyaltyProgramService.getDiscountByPatientCategory(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.discount = data;
      }
    );
  }

  ngOnInit(): void {
  }

}
