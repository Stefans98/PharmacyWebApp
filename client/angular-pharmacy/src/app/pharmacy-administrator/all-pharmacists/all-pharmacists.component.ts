import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Appointment } from '../../models/appointment.model';
import { Dermatologist } from '../../models/dermatologist.model';
import { Pharmacist } from '../../models/pharmacist.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { WorkDay } from '../../models/work-day.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { WorkDayService } from '../../services/schedule/work-day.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
import { PharmacistService } from '../../services/users/pharmacist.service';
import { PharmacyComponent } from '../pharmacy/pharmacy.component';

@Component({
  selector: 'app-all-pharmacists',
  templateUrl: './all-pharmacists.component.html',
  styleUrls: ['./all-pharmacists.component.scss']
})
export class AllPharmacistsComponent implements OnInit {
  dataSourceChangeIn = 1;
  searchInputLenght = 0;

  selectedGradeRange = 'Ništa od navedenog';

  public pharmacy: Pharmacy;
  public pharmacyId: number;
  public pharmacistsForPharmacy: Pharmacist[] = [];
  public dermatologistsAfterFilter: Pharmacist[] = [];
  public pharmaciesForDermatologist: Pharmacy[];
  public allPharmacies: Pharmacy[] = [];
  public testPharmacies: string[] = ['Jankovic', 'Zegin', 'asd'];
  public pharmaciesForSending: string[] = [];
  dataSource = new MatTableDataSource(this.pharmacistsForPharmacy);
  dataSourceAfterSearch = new MatTableDataSource(this.pharmacistsForPharmacy);

  public openDefiningWorkDayForm: boolean = false;
  public pharmacistForDefiningWorkDay: Pharmacist;

  public workDay: WorkDay;
  public appointment : Appointment;

  myTimePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#ffffff',
        buttonColor: '#5c6bc0'
    },
    dial: {
        dialBackgroundColor: '#5c6bc0',
    },
    clockFace: {
        clockFaceBackgroundColor: '#e8eaf6',
        clockHandColor: '#5c6bc0',
        clockFaceTimeInactiveColor: '#000000'
    }
  };

  chosenDate: string = '';
  public startTime: string = '';
  public endTime: string = '';
  maxDate: Date;

  gradeRanges: string[] = ['5 - 6', '6 - 7', '7 - 8', '8 - 9', '9 - 10', '10'];

  displayedColumns: string[] = ['name', 'lastname', 'averageGrade', 'pharmacies', 'defineWorkDay', 'firePharmacist'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacistService: PharmacistService, private pharmacyService: PharmacyService, 
              private authService: AuthenticationService, private workDayService: WorkDayService, public dialog: MatDialog) { 
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        console.log(this.pharmacy.id);
        this.getPharmacistsForPharmacy(this.pharmacy.id);
      }
    );

    this.pharmacyService.getAllPharmacies().subscribe(
      data => {
        this.allPharmacies = data;
      }
    );

  }

  getPharmacistsForPharmacy(id){
    this.pharmacistService.getPharmacistsForPharmacy(id).subscribe(
      data => {
        this.pharmacistsForPharmacy = data;
        this.dataSource.data = this.pharmacistsForPharmacy;
        this.dataSourceAfterSearch.data = this.pharmacistsForPharmacy;
      }
    );
  }

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  applySearch(event: Event) {
    this.dataSource = new MatTableDataSource(this.pharmacistsForPharmacy);
    this.dataSourceChangeIn = 1;
    const filter = (event.target as HTMLInputElement).value
    this.searchInputLenght = filter.length;
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSourceAfterSearch = new MatTableDataSource(this.dataSource.filteredData);
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
      //this.setDefaultValuesForFilter();
      this.openSnackBar('Fltraciju je moguće vršiti samo nakon pretrage!', 'Zatvori');
    }  
  }

  onDateChange(chosenDate) {
    this.chosenDate = moment(chosenDate).format('YYYY-MM-DD')
  }

  firePharmacist(pharmacist){
    this.pharmacistService.firePharmacist(this.pharmacy.id, pharmacist).subscribe(
      data => {
        this.openSnackBar('Uspešno ste obrisali farmaceuta!', 'Zatvori');
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            console.log(this.pharmacy.id);
            this.getPharmacistsForPharmacy(this.pharmacy.id);
          }
        );
      }, 
      error => {
        if(error.status == 400){
          this.openSnackBar('Brisanje farmaceuta nije uspelo! Farmaceut ima zakazane preglede koje mora da odradi!', 'Zatvori');
        }
      }
    );
  }

  defineWorkDay(pharmacist){
    this.openDefiningWorkDayForm = true;
    this.pharmacistForDefiningWorkDay = pharmacist;
  }

  sendDefindedWorkDay(pharmacist){
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;
    var workDay = new WorkDay(null, new Date(forrmatedStartTime), new Date(forrmatedEndTime), this.pharmacy, pharmacist);
    this.workDayService.defineWorkDayForPharmacist(workDay).subscribe(
      data => {
        this.openSnackBar('Uspešno ste definisali radni dan za farmaceuta!', 'Zatvori');
      },
      error => {
        if(error.status == 400){
          this.openSnackBar('Zakazivanje radnog dana trenutno nije moguće, molim Vas pokušajte ponovo! Razlog može biti poklapanje sa drugim radnim vremenom ili trenutni godišnji odmor/odsustvo.', 'Zatvori');
        }
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
