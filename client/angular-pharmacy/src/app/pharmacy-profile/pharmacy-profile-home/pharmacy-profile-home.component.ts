import { Component, OnInit } from '@angular/core';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-pharmacy-profile-home',
  templateUrl: './pharmacy-profile-home.component.html',
  styleUrls: ['./pharmacy-profile-home.component.scss']
})
export class PharmacyProfileHomeComponent implements OnInit {
  
  public pharmacy: Pharmacy;
  public scaledPharmacyAverageGrade: number;

  constructor(private authService: AuthenticationService, private pharmacyService: PharmacyService) { 
    pharmacyService.getPharmacyById(1).subscribe(
      data => {
        this.pharmacy = data;
        this.scaledPharmacyAverageGrade = this.pharmacy.averageGrade * 10;
      }
    );
  }

  ngOnInit(): void {
  }

}
