import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Medicine } from '../../../models/medicine.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-allergies-modal-dialog',
  templateUrl: './allergies-modal-dialog.component.html',
  styleUrls: ['./allergies-modal-dialog.component.scss']
})
export class AllergiesModalDialogComponent implements OnInit {

  medicines = new FormControl();
  public medicineList: Medicine[] = [];

  constructor(private medicineService: MedicineService, private authenticationService: AuthenticationService) { 
    this.medicineService.getMedicinesToWhichPatientIsAllergic(authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.medicineList = data;
      }
    );
  }

  ngOnInit(): void {
  }

}
