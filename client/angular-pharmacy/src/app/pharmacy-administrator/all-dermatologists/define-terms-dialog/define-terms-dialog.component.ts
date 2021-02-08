import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dermatologist } from '../../../models/dermatologist.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-define-terms-dialog',
  templateUrl: './define-terms-dialog.component.html',
  styleUrls: ['./define-terms-dialog.component.scss']
})
export class DefineTermsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DefineTermsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dermatologist, public pharmacyService: PharmacyService) { }

  ngOnInit(): void {
  }

}
