import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoyaltyProgram } from '../../models/loyalty-program.model';
import { LoyaltyProgramService } from '../../services/users/loyalty-program.service';

@Component({
  selector: 'app-loyalty-program',
  templateUrl: './loyalty-program.component.html',
  styleUrls: ['./loyalty-program.component.scss']
})
export class LoyaltyProgramComponent implements OnInit {

  loyaltyProgram: LoyaltyProgram;

  silverUserDiscount: number = 0;
  goldUserDiscount: number = 0;

  examinationPoints: number;
  counselingPoints: number;

  value: number = 40;
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100,
    showOuterSelectionBars: true
  };

  silverUserDiscountSliderOptions: Options = {
    floor: 0,
    ceil: 100,
    minLimit: 10
  }


  goldUserDiscountSliderOptions: Options = {
    floor: 0,
    ceil: 100,
    minLimit: this.silverUserDiscount
  }

  constructor(private loyaltyProgramService : LoyaltyProgramService, private snackBar : MatSnackBar) {
    this.loyaltyProgramService.getLoyaltyProgram().subscribe(data => {
      this.loyaltyProgram = data;
      this.value = this.loyaltyProgram.silverPointsBorder;
      this.highValue = this.loyaltyProgram.goldPointsBorder;
      this.silverUserDiscount = this.loyaltyProgram.silverCategoryDiscount;
      this.goldUserDiscount = this.loyaltyProgram.goldCategoryDiscount;
      this.examinationPoints = this.loyaltyProgram.pointsPerExaminations;
      this.counselingPoints = this.loyaltyProgram.pointsPerCounseling;
    });
   }

  ngOnInit(): void {
  }


  silverUserDiscountSliderValueChange() : void {
    const newOptions: Options = Object.assign({}, this.goldUserDiscountSliderOptions);
    newOptions.minLimit = this.silverUserDiscount;
    this.goldUserDiscountSliderOptions = newOptions;
    if (this.silverUserDiscount > this.goldUserDiscount) {
      this.goldUserDiscount = this.silverUserDiscount;
    }
  }


  defineLoyaltyProgramClick(): void {
    if (!this.checkRanges()) {
      this.snackBar.open('Poeni dobijeni za pregled ili savetovanje moraju biti u opsegu 0 - 100!', 'Zatvori', { 
        duration : 6000, 
        verticalPosition: 'top'
       });
       return;
    }
    this.loyaltyProgramService.defineLoyaltyProgram(new LoyaltyProgram(this.value, this.highValue, this.silverUserDiscount, this.goldUserDiscount, 
                   this.examinationPoints, this.counselingPoints)).subscribe(data => {
                    this.snackBar.open('Loyalty program je definisan!', null, { 
                      duration : 3000, 
                      verticalPosition: 'top'
                     });
                   });
  }

  checkRanges() : boolean {
    if (this.examinationPoints > 100 || this.examinationPoints < 0 || this.counselingPoints > 100 || this.counselingPoints < 0) {
      console.log('ne')
      return false;
    }
    console.log('da')
    return true;
  }
}
