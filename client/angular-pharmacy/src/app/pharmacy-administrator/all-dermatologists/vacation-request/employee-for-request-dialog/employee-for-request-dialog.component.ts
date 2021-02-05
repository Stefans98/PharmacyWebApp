import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dermatologist } from '../../../../models/dermatologist.model';
import { PharmacyService } from '../../../../services/pharmacy/pharmacy.service';
import { DermatologistService } from '../../../../services/users/dermatologist.service';
import { PharmacistService } from '../../../../services/users/pharmacist.service';

@Component({
  selector: 'app-employee-for-request-dialog',
  templateUrl: './employee-for-request-dialog.component.html',
  styleUrls: ['./employee-for-request-dialog.component.scss']
})
export class EmployeeForRequestDialogComponent implements OnInit {

  public dermatologist: Dermatologist;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private dermatologistService: DermatologistService, private pharmacistService: PharmacistService) {
    dermatologistService.getDermatologistById(data).subscribe(
      data => {
        this.dermatologist = data;
      }
    );
   }

  ngOnInit(): void {
  }

}
