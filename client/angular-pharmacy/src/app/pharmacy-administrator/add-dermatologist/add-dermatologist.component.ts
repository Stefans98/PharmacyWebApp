import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Appointment } from '../../models/appointment.model';
import { Dermatologist } from '../../models/dermatologist.model';
import { Patient } from '../../models/patient.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { WorkDay } from '../../models/work-day.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { WorkDayService } from '../../services/schedule/work-day.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
import { PharmaciesForDermatologistDialogComponent } from '../all-dermatologists/pharmacies-for-dermatologist-dialog/pharmacies-for-dermatologist-dialog.component';
import { PharmacyComponent } from '../pharmacy/pharmacy.component';

@Component({
  selector: 'app-add-dermatologist',
  templateUrl: './add-dermatologist.component.html',
  styleUrls: ['./add-dermatologist.component.scss']
})
export class AddDermatologistComponent implements OnInit {

  dataSourceChangeIn = 1;
  searchInputLenght = 0;

  selectedPharmacy = 'Ništa od navedenog';
  selectedGradeRange = 'Ništa od navedenog';

  public pharmacy: Pharmacy;
  public pharmacyId: number;
  public dermatologistsForPharmacy: Dermatologist[] = [];
  public dermatologistsAfterFilter: Dermatologist[] = [];
  public pharmaciesForDermatologist: Pharmacy[];
  public allPharmacies: Pharmacy[] = [];
  public testPharmacies: string[] = ['Jankovic', 'Zegin', 'asd'];
  public pharmaciesForSending: string[] = [];
  dataSource = new MatTableDataSource(this.dermatologistsForPharmacy);
  newDataSource = new MatTableDataSource(this.dermatologistsForPharmacy);
  dataSourceAfterSearch = new MatTableDataSource(this.dermatologistsForPharmacy);

  public openDefiningTermsForm: boolean = false;
  public openDefiningWorkDayForm: boolean = false;
  public dermatologistForDefiningTerms: Dermatologist;

  gradeRanges: string[] = ['5 - 6', '6 - 7', '7 - 8', '8 - 9', '9 - 10', '10'];

  displayedColumns: string[] = ['name', 'lastname', 'averageGrade', 'pharmacies', 'defineTerms'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private dermatologistService: DermatologistService, private pharmacyService: PharmacyService, 
              private authService: AuthenticationService, public dialog: MatDialog, private appointmentService: AppointmentService, 
              private workDayService: WorkDayService) { 
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        console.log(this.pharmacy.id);
        this.getDermatologistsForPharmacy(this.pharmacy.id);
      }
    );

    this.pharmacyService.getAllPharmacies().subscribe(
      data => {
        this.allPharmacies = data;
      }
    );

    this.pharmaciesForDermatologist = [];

  }

  getDermatologistsForPharmacy(id){
    this.dermatologistService.getDermatologistsNotForPharmacy(id).subscribe(
      data => {
        this.dermatologistsForPharmacy = data;
        this.dataSource.data = this.dermatologistsForPharmacy;
        this.newDataSource.data = this.dermatologistsForPharmacy;
        this.dataSourceAfterSearch.data = this.dermatologistsForPharmacy;
      }
    );
  }


  ngOnInit(): void {
  }

  applySearch(event: Event) {

    this.dataSource = new MatTableDataSource(this.dermatologistsForPharmacy);
    this.dataSourceChangeIn = 1;
    const filter = (event.target as HTMLInputElement).value
    this.searchInputLenght = filter.length;
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSourceAfterSearch = new MatTableDataSource(this.dataSource.filteredData);
  }

  openDialog(dermatologist) {
    const dialogRef = this.dialog.open(PharmaciesForDermatologistDialogComponent, {
      data: dermatologist
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getPharmaciesForDermatologist(id: number){
    var pharmacies: Pharmacy[];
    var pharmacyNames: string[] = [];
    this.pharmacyService.getPharmaciesForDermatologist(id).subscribe(
      data => {
        this.pharmaciesForDermatologist = data;
      }
    );
  }

  setFilterPreditct() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (this.dataSourceChangeIn == 2) {
        return true;
      } else if (this.dataSourceChangeIn == 3) {
        return data.averageGrade.toString().startsWith(filter);
      }   
    };
  }

  onChangePharmacyFilter(value) {
    if (this.searchInputLenght > 0) {
      this.setFilterPreditct();
      this.dataSourceChangeIn = 2;
      this.selectedPharmacy = value;
     
      if (value === undefined) {
        this.dataSource.filter = this.dataSourceAfterSearch.filter;
      }else if (value == 'Ništa od navedenog'){
        this.dataSource.filter = this.dataSourceAfterSearch.filter;
      } else {
        this.dermatologistService.getDermatologistsNotForPharmacy(value.id).subscribe(
          data => {
            this.dermatologistsAfterFilter = data;
            var filteredDermatologists: Dermatologist[] = [];
            for(var dermatologist of this.dermatologistsAfterFilter){
              for(var filterDermatologist of this.dermatologistsForPharmacy){
                if(dermatologist.id == filterDermatologist.id){
                  filteredDermatologists.push(dermatologist);
                }
              }
            }
            this.dataSource.data = filteredDermatologists;
          }
        );
      }

    } else {
      this.setDefaultValuesForFilter();
      this.openSnackBar('Filtraciju je moguće vršiti samo nakon pretrage dermatologa!', 'Zatvori');
    }  
  }

  onChangeGradeRangeFilter(value) {

    if (this.searchInputLenght > 0) {
      this.dataSource.filter = this.dataSourceAfterSearch.filter;
      this.setFilterPreditct();
      this.dataSourceChangeIn = 3;
      this.selectedGradeRange = value;

      if (this.selectedGradeRange === undefined) {
        this.dataSource.filter = this.dataSourceAfterSearch.filter;
      } else if (this.selectedGradeRange === '5 - 6') {
        this.dataSource.filter = '5';
      } else if (this.selectedGradeRange === '6 - 7') {
        this.dataSource.filter = '6';
      } else if (this.selectedGradeRange === '7 - 8') {
        this.dataSource.filter = '7';
      } else if (this.selectedGradeRange === '8 - 9') {
        this.dataSource.filter = '8';
      } else if (this.selectedGradeRange === '9 - 10') {
        this.dataSource.filter = '9';
      } else  {
        this.dataSource.filter = '10';
      }
    } else {
      this.setDefaultValuesForFilter();
      this.openSnackBar('Fltraciju je moguće vršiti samo nakon pretrage!', 'Zatvori');
    }  
  }

  setDefaultValuesForFilter() : void {
    this.selectedPharmacy = null;
  }

  hireDermatologist(dermatologist){
    this.dermatologistService.hireDermatologist(this.pharmacy.id, dermatologist).subscribe(
      data => {
        this.openSnackBar('Uspešno ste dodali dermatologa!', 'Zatvori');
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            console.log(this.pharmacy.id);
            this.getDermatologistsForPharmacy(this.pharmacy.id);
          }
        );
      }, 
      error => {
        if(error.statu == 400){
          this.openSnackBar('Dodavanje dermatologa nije uspelo!', 'Zatvori');
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 30500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
