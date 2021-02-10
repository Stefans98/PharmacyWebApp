import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-pharmacy-profile-home',
  templateUrl: './pharmacy-profile-home.component.html',
  styleUrls: ['./pharmacy-profile-home.component.scss']
})
export class PharmacyProfileHomeComponent implements OnInit, AfterViewInit {
  
  public pharmacy: Pharmacy;
  name: string;
  public scaledPharmacyAverageGrade: number;
  @Input() pharmacyId: number;

  constructor(private authService: AuthenticationService, private pharmacyService: PharmacyService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.pharmacyService.getPharmacyById(this.pharmacyId).subscribe(
      data => {
        this.pharmacy = data;
        this.name = this.pharmacy.name;
        this.scaledPharmacyAverageGrade = this.pharmacy.averageGrade * 10;
      }
    );
  }

}
