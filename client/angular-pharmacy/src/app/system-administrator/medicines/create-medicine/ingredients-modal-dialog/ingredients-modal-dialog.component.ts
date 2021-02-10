import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ingredients-modal-dialog',
  templateUrl: './ingredients-modal-dialog.component.html',
  styleUrls: ['./ingredients-modal-dialog.component.scss']
})
export class IngredientsModalDialogComponent implements OnInit {

  public newIngredient : string;
  public ingredients : string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data : string[], private snackBar : MatSnackBar, 
                private dialogRef : MatDialogRef<IngredientsModalDialogComponent>) {
    this.ingredients = data;
   }

  ngOnInit(): void {
  }

  addIngredientClick() : void {
    if (!this.checkIfIngredientAlreadyExist()) {
      this.ingredients.push(this.newIngredient);
    } else {
      this.snackBar.open('Sastojak već postoji!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
    }
  }

  confirmClick() : void {
    this.dialogRef.close({ingredients : this.ingredients});
  }

  checkIfIngredientAlreadyExist() : boolean {
    for (let s of this.ingredients) {
      if (s == this.newIngredient) {
        return true;
      }
    }
    return false;
  }

}
