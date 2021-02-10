import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MedicineReservation } from '../../../models/medicineReservation.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-reserved-drugs',
  templateUrl: './reserved-drugs.component.html',
  styleUrls: ['./reserved-drugs.component.scss']
})
export class ReservedDrugsComponent implements OnInit {

  checked = false;
  indeterminate = false;

  medicines: MedicineReservation[] = [];
  displayedColumns: string[] = ['name', 'manufacturer', 'price', 'pharmacy', 'final_purchasing_date', 'canceling'];
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
          this.openSnackBar('Trenutno ne postoji nijedan rezervisani lek!', 'Zatvori', 3200);
        }
      }
    );
  }

  ngOnInit(): void {}

  cancelMedicineReservationClick(element): void {
    this.medicineService.cancelMedicineReservation(element.id).subscribe(
      data => {
        this.openSnackBar('Rezervacija leka je uspešno otkazana!', 'Zatvori', 3000);
        this.medicineService.getAllReservedMedicinesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
          data => {
            this.medicines = data;
            this.dataSource.data = this.medicines;
          },
          error => {
            if (error.status == 404){
              this.dataSource.data = [];
              this.openSnackBar('Rezervacija leka je uspešno otkazana i trenutno ne postoji nijedan rezervisani lek!', 'Zatvori', 4000);
            }
          }
        );
      },
      error => {
        if (error.status = 406){
          this.openSnackBar('Rezeravacija nije otkazana na vreme! Otkazivanje nije dozvoljeno!', 'Zatvori', 4000);
        } else {
          this.openSnackBar('Rezervaciju trenutno nije moguće otkazati, molim Vas pokušajte ponovo!', 'Zatvori', 4000);
        }
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
