import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pharmacist } from '../../../models/pharmacist.model';
import { PharmacistService } from '../../../services/users/pharmacist.service';

@Component({
  selector: 'app-pharmacist-for-request',
  templateUrl: './pharmacist-for-request.component.html',
  styleUrls: ['./pharmacist-for-request.component.scss']
})
export class PharmacistForRequestComponent implements OnInit {

  public pharmacist: Pharmacist;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private pharmacistService: PharmacistService) {
    pharmacistService.getPharmacistById(data).subscribe(
      data => {
        this.pharmacist = data;
      }
    );
   }

  ngOnInit(): void {
  }

}
