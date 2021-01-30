import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.scss']
})
export class PharmacyRegistrationComponent implements OnInit {

  public id : number;
  public name: string;
  public city: string;
  public street: string;
  public country: string;
  public description: string;

  constructor(private pharmacyService : PharmacyService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  registrationClick() : void {
    this.pharmacyService.registerPharmacy(new Pharmacy(0, this.name, this.city, this.country,
      this.street, this.description, 0, null)).subscribe(user => {
        this.snackBar.open('Apoteka je uspešno registrovan!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      })
  }

}
