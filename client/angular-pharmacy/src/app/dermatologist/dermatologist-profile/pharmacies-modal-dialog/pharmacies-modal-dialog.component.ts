import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pharmacy } from '../../../models/pharmacy.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { DermatologistService } from '../../../services/users/dermatologist.service';

@Component({
  selector: 'app-pharmacies-modal-dialog',
  templateUrl: './pharmacies-modal-dialog.component.html',
  styleUrls: ['./pharmacies-modal-dialog.component.scss']
})

export class PharmaciesModalDialogComponent implements OnInit {

  pharmacies = new FormControl();
  public pharmaciesList: Pharmacy[];

  constructor(private dermatologistService : DermatologistService, private authenticationService : AuthenticationService) { 
    this.dermatologistService.getPharmaciesForDermatologist(this.authenticationService.getLoggedUserId())
    .subscribe( data => {
        this.pharmaciesList = data;
      }
    );   
  }

  ngOnInit(): void {
  }


}
