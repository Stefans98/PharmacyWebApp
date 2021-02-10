import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Grade } from '../../../models/grade.model';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { GradeService } from '../../../services/users/grade.service';

@Component({
  selector: 'app-change-grade',
  templateUrl: './change-grade.component.html',
  styleUrls: ['./change-grade.component.scss']
})
export class ChangeGradeComponent implements OnInit {
  grades: Grade[] = [];
  displayedColumns: string[] = ['gradeEntity', 'grade', 'changingGrade'];
  dataSource = new MatTableDataSource(this.grades);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private gradeService: GradeService, private authenticationService: AuthenticationService) {
    this.gradeService.getAllGradesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.grades = data;
        this.dataSource.data = this.grades;
    });
  }

  ngOnInit() {}

  changeGrade(newGrade): void {
    this.gradeService.updateGrade(newGrade).subscribe(
      data => {
        this.openSnackBar('Uspešno ste izmenili ocenu na ' + data.grade + '!', 'Zatvori', 2500);
      },
      error => {
        this.openSnackBar('Neuspešna izmena ocene!', 'Zatvori', 2500);
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
