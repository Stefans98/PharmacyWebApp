import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineSpecification } from '../../../models/medicine-specification.model';
import { Medicine } from '../../../models/medicine.model';
import { Substitution } from '../../../models/substitution.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { IngredientsModalDialogComponent } from './ingredients-modal-dialog/ingredients-modal-dialog.component';
import { SubstitutionsModalDialogComponent } from './substitutions-modal-dialog/substitutions-modal-dialog.component';

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.scss']
})
export class CreateMedicineComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public id : number;
  public name: string;
  public code: string;
  public manufacturer: string;
  public points: number;
  public medicineType: number;
  public medicineForm: number;
  public onPrescription: boolean;
  public additionalInformations: string;
  public dailyDose: number;
  public contraindications: string;
  public substitutions: Substitution[] = [];

  private allMedicines: Medicine[] = [];
  private ingredients : string[] = [];

  constructor(private formBuilder : FormBuilder, private medicineService: MedicineService, private dialog : MatDialog,
            private snackBar: MatSnackBar) {
    this.medicineService.getAll().subscribe(data => {
      this.allMedicines = data;
    })
   }

  ngOnInit(): void {
  }

  selectSubstitutionsClick() : void {
    const dialogRef = this.dialog.open(SubstitutionsModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '550px',
      data: { medicines : this.allMedicines, substitutions : this.substitutions }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.substitutions = result.substitutions;
        console.log(this.substitutions);
      }
    })

  }

  createClick() : void {
    this.medicineService.createMedicine(new Medicine(0, this.name, this.code, this.manufacturer,
      this.medicineType - 1, this.medicineForm - 1, this.additionalInformations, this.points, this.onPrescription,
      new MedicineSpecification(this.dailyDose, this.contraindications, this.substitutions, this.ingredients))).subscribe(
        data => {
          this.snackBar.open('Lek je uspešno kreiran!', null, { 
            duration : 3000, 
            verticalPosition: 'top'
           });
        },
        error => {
          if (error.status == 409)
          {
            this.snackBar.open('Lek sa zadatom šifrom već postoji!', null, { 
              duration : 3000, 
              verticalPosition: 'top'
             });
          }
        }
      )
  }

  showIngredientsClick() : void {
    const dialogRef = this.dialog.open(IngredientsModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '550px',
      data: this.ingredients
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingredients = result.ingredients;
      }
    })
  }

}
