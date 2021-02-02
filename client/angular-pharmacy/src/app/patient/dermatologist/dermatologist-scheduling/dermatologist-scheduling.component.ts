import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineReservation } from '../../../models/medicineReservation.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-dermatologist-scheduling',
  templateUrl: './dermatologist-scheduling.component.html',
  styleUrls: ['./dermatologist-scheduling.component.scss']
})
export class DermatologistSchedulingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  checked = false;
  indeterminate = false;

  medicines: MedicineReservation[] = [];
  displayedColumns: string[] = ['date', 'time', 'price', 'dermatologist', 'grade', 'scheduling'];
  dataSource = new MatTableDataSource(this.medicines);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private medicineService: MedicineService, private authenticationService: AuthenticationService) {
    this.medicineService.getAllReservedMedicinesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.medicines = data;
        this.dataSource.data = this.medicines;
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Trenutno ne postoji nijedan slobodan termin!', 'Zatvori', 3200);
        }
      }
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  scheduleAppointmentClick(element): void {
    this.medicineService.cancelMedicineReservation(element.id).subscribe(
      data => {
        this.openSnackBar('Termin je uspešno zakazan!', 'Zatvori', 3000);
        this.medicineService.getAllReservedMedicinesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
          data => {
            this.medicines = data;
            this.dataSource.data = this.medicines;
          },
          error => {
            if (error.status == 404){
              this.dataSource.data = [];
              this.openSnackBar('Termin je uspešno zakazan i više ne postoje slobodni termini!', 'Zatvori', 4000);
            }
          }
        );
      },
      error => {
        this.openSnackBar('Zakazivanje termina trenutno nije moguće, molim Vas pokušajte ponovo!', 'Zatvori', 4000);
      });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }
}
