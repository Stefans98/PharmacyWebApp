import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { Promotion } from '../../models/promotion.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { PromotionService } from '../../services/pharmacy/promotion.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-define-promotion',
  templateUrl: './define-promotion.component.html',
  styleUrls: ['./define-promotion.component.scss']
})
export class DefinePromotionComponent implements OnInit {

  public today: Date;
  public startDate: Date;
  public endDate: Date;
  public text: string;
  public pharmacy: Pharmacy;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private promotionService: PromotionService, private snackBar: MatSnackBar, private pharmacyService: PharmacyService, 
              private authService: AuthenticationService) {
    this.today = new Date();
  }

  ngOnInit(): void {
  }

  definePromotion(){
    if(this.text == ''){
      this.openSnackBar('Unesite tekst promocije!', 'Zatvori');
      return;
    }
    if(this.startDate > this.endDate){
      this.openSnackBar('Datum početka važenja akcije mora biti pre datuma kraja važenja akcije!', 'Zatvori');
      return;
    }
    var promotion = new Promotion(null, this.text, this.startDate, this.endDate);
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.promotionService.definePromotion(promotion, this.pharmacy.id).subscribe(
          data => { this.openSnackBar('Uspešno ste definisali promociju!', 'Zatvori'); },
          error => {
            if (error.status == 400){
              this.openSnackBar('Niste uspešno definisali promociju!', 'Zatvori');
            }
          }
        );
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
