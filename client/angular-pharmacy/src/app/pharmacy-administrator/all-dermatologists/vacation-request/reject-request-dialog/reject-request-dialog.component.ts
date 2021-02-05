import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Vacation } from '../../../../models/vacation.model';
import { VacationService } from '../../../../services/users/vacation.service';

@Component({
  selector: 'app-reject-request-dialog',
  templateUrl: './reject-request-dialog.component.html',
  styleUrls: ['./reject-request-dialog.component.scss']
})
export class RejectRequestDialogComponent implements OnInit {

  public text: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Vacation, private snackBar: MatSnackBar, private vacationService: VacationService, private dialogRef: MatDialogRef<RejectRequestDialogComponent>) { }

  ngOnInit(): void {
  }

  rejectAndSendReason(){
    this.vacationService.rejectVacationRequest(this.text, this.data).subscribe(
      data => {
        this.openSnackBar('Zahtev je odbijen.', 'Zatvori')
        this.dialogRef.close();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
