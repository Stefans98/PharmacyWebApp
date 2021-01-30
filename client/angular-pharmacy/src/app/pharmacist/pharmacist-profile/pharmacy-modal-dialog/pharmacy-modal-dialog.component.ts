import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pharmacy } from '../../../models/pharmacy.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { PharmacistService } from '../../../services/users/pharmacist.service';

@Component({
  selector: 'app-pharmacy-modal-dialog',
  templateUrl: './pharmacy-modal-dialog.component.html',
  styleUrls: ['./pharmacy-modal-dialog.component.scss']
})
export class PharmacyModalDialogComponent implements OnInit {

  pharmacies = new FormControl();
  public pharmacy: Pharmacy;

  constructor(private pharmacistService : PharmacistService, private authenticationService : AuthenticationService) { 
    this.pharmacistService.getPharmacyForPharmacist(this.authenticationService.getLoggedUserId())
    .subscribe( data => {
        this.pharmacy = data;
      }
    );   
  }

  ngOnInit(): void {
  }

}
