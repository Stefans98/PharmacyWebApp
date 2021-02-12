import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { AppointmentPrice } from '../../models/appointment-price.model';
import { Appointment } from '../../models/appointment.model';
import { Dermatologist } from '../../models/dermatologist.model';
import { MedicinePrice } from '../../models/medicine-price.model';
import { Patient } from '../../models/patient.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { Pricelist } from '../../models/pricelist.model';
import { WorkDay } from '../../models/work-day.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { PricelistService } from '../../services/pharmacy/pricelist.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { WorkDayService } from '../../services/schedule/work-day.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import { DermatologistService } from '../../services/users/dermatologist.service';
import { PharmacyComponent } from '../pharmacy/pharmacy.component';
import { DefineTermsDialogComponent } from './define-terms-dialog/define-terms-dialog.component';
import { PharmaciesForDermatologistDialogComponent } from './pharmacies-for-dermatologist-dialog/pharmacies-for-dermatologist-dialog.component';

@Component({
  selector: 'app-all-dermatologists',
  templateUrl: './all-dermatologists.component.html',
  styleUrls: ['./all-dermatologists.component.scss']
})
export class AllDermatologistsComponent implements OnInit, AfterViewInit {

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

  public workDay: WorkDay;
  public appointment : Appointment;

  public openDefiningTermsForm: boolean = false;
  public openDefiningWorkDayForm: boolean = false;
  public dermatologistForDefiningTerms: Dermatologist;

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
  minTimeFinishing: string = '00:00';
  disabledTimeFinishing: boolean = false;
  //time1: string = '00:00';
  time2: string = '00:00';
  maxDate: Date;

  public pricelist: Pricelist;
  public medicinePrices: MedicinePrice[];
  public appointmentPrices: AppointmentPrice[];

  public price: number = 0;


  gradeRanges: string[] = ['5 - 6', '6 - 7', '7 - 8', '8 - 9', '9 - 10', '10'];

  displayedColumns: string[] = ['name', 'lastname', 'averageGrade', 'pharmacies', 'defineTerms', 'defineWorkDay', 'deleteDermatologist'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngAfterViewInit(){
  }

  constructor(private snackBar: MatSnackBar, private dermatologistService: DermatologistService, private pharmacyService: PharmacyService, 
              private authService: AuthenticationService, public dialog: MatDialog, private appointmentService: AppointmentService, 
              private workDayService: WorkDayService, private pricelistService: PricelistService) { 
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.getDermatologistsForPharmacy(this.pharmacy.id);
        this.pricelistService.getPricelistForPharmacy(this.pharmacy.id).subscribe(
          data => {
            this.pricelist = data;
            this.medicinePrices = this.pricelist.medicinePrices;
            this.appointmentPrices = this.pricelist.appointmentPrices;
            for(var appPrice of this.appointmentPrices){
              if(appPrice.appointmentType == 0){
                this.price = appPrice.price;
              }
            }
          }
        );
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
    this.dermatologistService.getDermatologistsForPharmacy(id).subscribe(
      data => {
        this.dermatologistsForPharmacy = data;
        this.dataSource.data = this.dermatologistsForPharmacy;
        this.newDataSource.data = this.dermatologistsForPharmacy;
        this.dataSourceAfterSearch.data = this.dermatologistsForPharmacy;
      }
    );
  }


  ngOnInit(): void {
    this.maxDate = new Date();
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

  defineTerms(dermatologist){
    /*const dialogRef = this.dialog.open(DefineTermsDialogComponent, {
      data: dermatologist
    });
    dialogRef.updatePosition({left:'300px'})*/

    this.openDefiningTermsForm = true;
    this.openDefiningWorkDayForm = false;
    this.dermatologistForDefiningTerms = dermatologist;

  }

  defineWorkDay(dermatologist){ 
    this.openDefiningWorkDayForm = true;
    this.openDefiningTermsForm = false;
    this.dermatologistForDefiningTerms = dermatologist;
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
        this.dermatologistService.getDermatologistsForPharmacy(value.id).subscribe(
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

  onDateChange(chosenDate) {
    this.chosenDate = moment(chosenDate).format('YYYY-MM-DD')
  }

  /*onStartTimeChange(value) {
    console.log('aaaaaaaaaaaaa');
    this.startTime = value;
    this.minTimeFinishing = value;
    this.disabledTimeFinishing = false;
  }

  onEndTimeChange(value) {
    console.log('aaaaaaaa');
    this.endTime = value;
  }*/

  sendDefindedTerm(){

    if(this.dermatologistForDefiningTerms == undefined){
      this.openSnackBar('Izaberite dermatologa za kog definišete termin!', 'Zatvori');
      return;
    }

    console.log(this.chosenDate);
    console.log(this.startTime);
    console.log(this.endTime);
   
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;

    var sec = (new Date(forrmatedEndTime).getTime() - new Date(forrmatedStartTime).getTime()) / 1000;
    var min = new Date(sec).getTime() / 60;
    var priceMultiplier = Math.round(min / 30);
    if(min % 30 != 0){
      priceMultiplier += 1;
    }
    var finalPrice = this.price * priceMultiplier;

    //var appointment = new Appointment(null, 0, 0, this.startTime, this.endTime, new Patient(1, '', '', '', '', '', '', '', 0, 1, ''), );
    this.workDayService.getWorkDayInPharmacyByDateAndEmployeeId(this.chosenDate, this.dermatologistForDefiningTerms.id.toString(), this.pharmacy.id.toString()).subscribe(
      data => {
        this.workDay = data;
        this.appointment = new Appointment(0, 1, 0, new Date(forrmatedStartTime), new Date(forrmatedEndTime), new Patient(1, '', '', '', '', '', '', '', 0, 1, '', null), this.workDay, null, finalPrice); 
        this.appointmentService.scheduleExaminationForDermatologist(this.appointment).subscribe(
          data => {
            this.openSnackBar('Uspešno ste definisali termin za dermatologa!', 'Zatvori');
          },
          error => {
            this.openSnackBar('Zakazivanje termina trenutno nije moguće, molim Vas pokušajte ponovo!', 'Zatvori');
          });
      },
      error => {
        if (error.status == 404) {
          this.openSnackBar('Dermatolog ne radi u apoteci izabranog datuma!', 'Zatvori');
        }
      });
  }

  sendDefindedWorkDay(dermatologist){
    const forrmatedStartTime = this.chosenDate + ' ' + this.startTime;
    const forrmatedEndTime = this.chosenDate + ' ' + this.endTime;
    var workDay = new WorkDay(null, new Date(forrmatedStartTime), new Date(forrmatedEndTime), this.pharmacy, dermatologist);
    this.workDayService.defineWorkDayForDermatologist(workDay).subscribe(
      data => {
        this.openSnackBar('Uspešno ste definisali radni dan za dermatologa!', 'Zatvori');
      },
      error => {
        if(error.status == 400){
          this.openSnackBar('Zakazivanje radnog dana trenutno nije moguće, molim Vas pokušajte ponovo! Razlog može biti poklapanje sa drugim radnim vremenom ili trenutni godišnji odmor/odsustvo.', 'Zatvori');
        }
      }
    );
  }

  fireDermatologist(dermatologist){
    this.dermatologistService.fireDermatologist(this.pharmacy.id, dermatologist).subscribe(
      data => {
        this.openSnackBar('Uspešno ste obrisali dermatologa!', 'Zatvori');
        this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            console.log(this.pharmacy.id);
            this.getDermatologistsForPharmacy(this.pharmacy.id);
          }
        );
      }, 
      error => {
        if(error.status == 400){
          this.openSnackBar('Brisanje dermatologa nije uspelo! Dermatolog ima zakazane preglede koje mora da odradi!', 'Zatvori');
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
