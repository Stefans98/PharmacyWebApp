import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Medicine } from '../../../../models/medicine.model';
import { Substitution } from '../../../../models/substitution.model';

@Component({
  selector: 'app-substitutions-modal-dialog',
  templateUrl: './substitutions-modal-dialog.component.html',
  styleUrls: ['./substitutions-modal-dialog.component.scss']
})
export class SubstitutionsModalDialogComponent implements OnInit {

  substitutions: Substitution[] = [];
  medicines: Medicine[] = [];
  dataSource = new MatTableDataSource(this.medicines);
  displayedColumns: string[] = ['code', 'name', 'check'];

  constructor(public dialogRef: MatDialogRef<SubstitutionsModalDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) {
    this.medicines = data.medicines;
    this.dataSource.data = this.medicines;
    this.substitutions = data.substitutions;
   }

  ngOnInit(): void {
  }

  medicineChecked(element : Medicine, checked : boolean) : void {
    if (checked) {
      this.substitutions.push(new Substitution(element.name, element.code));
    } else {
      let i = 0;
      for (let s of this.substitutions) {
        if (s.code === element.code) {
          this.substitutions.splice(i, 1);
          return;
        }
        i++;
      }
    }
    
  }

  confirmClick() : void {
    this.dialogRef.close({substitutions : this.substitutions})
  }

  isChecked(element) : boolean {
    for (let s of this.substitutions) {
      if (s.code == element.code) {
        return true;
      }
    }
    return false;
  }

}
