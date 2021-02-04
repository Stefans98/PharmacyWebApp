import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dermatologist } from '../../../models/dermatologist.model';
import { Pharmacy } from '../../../models/pharmacy.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-dermatologists-for-pharmacy-dialog',
  templateUrl: './dermatologists-for-pharmacy-dialog.component.html',
  styleUrls: ['./dermatologists-for-pharmacy-dialog.component.scss']
})
export class DermatologistsForPharmacyDialogComponent implements OnInit {

  public pharmacies: string[];
  public dermatologist: Dermatologist[];
  public pharmaciesForDermatologist: Pharmacy[] = [];

  constructor(public dialogRef: MatDialogRef<DermatologistsForPharmacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dermatologist, public pharmacyService: PharmacyService) {

    this.pharmacies = [];

    this.pharmacyService.getPharmaciesForDermatologist(this.data.id).subscribe(
      data => {
        this.pharmaciesForDermatologist = data;
        for(var p of this.pharmaciesForDermatologist){
          this.pharmacies.push(p.name);
        }
      }
    );

   }

  ngOnInit(): void {
  }

  getPharmacies(dermatologistsPharmacies: string[]){
    for(var p of dermatologistsPharmacies){
      console.log(p);
    }
    this.pharmacies = dermatologistsPharmacies;
  }

}
