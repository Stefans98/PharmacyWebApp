import { Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-pharmacy-administrator-my-pharmacy',
  templateUrl: './pharmacy-administrator-my-pharmacy.component.html',
  styleUrls: ['./pharmacy-administrator-my-pharmacy.component.scss']
})
export class PharmacyAdministratorMyPharmacyComponent implements OnInit {
  public medicineList: Medicine[] = [{id: 1, code: '123', name: 'Brufen', manufacturer: '', medicineType: 0,  medicineForm: 0, 
                                        additionalInformation : '', points : 0, onPrescription : false, medicineSpecification: null},
                                     {id: 2, code: '321', name: 'Nimulid', manufacturer: '', medicineType: 0,  medicineForm: 0, 
                                     additionalInformation : '', points : 0, onPrescription : false, medicineSpecification: null}];

  public pharmacy: Pharmacy;
  public id: number;
  public name: string;
  public address: string;
  public description: string;
  public averageGrade: number;

  constructor(private pharmacyService: PharmacyService, private authService: AuthenticationService) {
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.prepareDate(this.pharmacy); 
      }
    )
  }

  prepareDate(pharmacy: Pharmacy) : void {
    this.id = pharmacy.id;
    this.name = pharmacy.name;
    this.description = pharmacy.description;
    this.address = pharmacy.country;
  }

  ngOnInit(): void {
  }

}
