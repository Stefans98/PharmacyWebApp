import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pharmacy } from '../../../models/pharmacy.model';
import { Subscription } from '../../../models/subscription.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';
import { SubscriptionService } from '../../../services/pharmacy/subscription.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-all-pharmacies',
  templateUrl: './all-pharmacies.component.html',
  styleUrls: ['./all-pharmacies.component.scss']
})

export class AllPharmaciesComponent implements OnInit, AfterViewInit {
  checked = false;
  indeterminate = false;

  mySubscriptions : Subscription[] = [];

  selectedGradeRange = 'Ništa od navedenog';
  selectedName = 'Ništa od navedenog';
  selectedCity = 'Ništa od navedenog';

  dataSourceChangeIn = 1;
  searchInputLenght = 0;

  pharmacies: Pharmacy[] = [];
  displayedColumns: string[] = ['name', 'averageGrade', 'address', 'pharmacyProfile', 'subscribe'];
  dataSource = new MatTableDataSource(this.pharmacies);
  newDataSource = new MatTableDataSource(this.pharmacies);
  dataSourceAfterSearch = new MatTableDataSource(this.pharmacies);

  gradeRanges: string[] = ['5 - 6', '6 - 7', '7 - 8', '8 - 9', '9 - 10', '10']
  names: string[] = [];
  namesWithoutDuplicate: string[] = [];
  cities: string[] = [];
  citiesWithoutDuplicate: string[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacyService: PharmacyService, private subscriptionService : SubscriptionService,
              private authService : AuthenticationService, private router : Router) {
    this.pharmacyService.getAllPharmacies().subscribe(
      data => {
        this.pharmacies = data;
        this.dataSource.data = this.pharmacies;
        this.newDataSource.data = this.pharmacies;
        this.dataSourceAfterSearch.data = this.pharmacies;

        this.namesWithoutDuplicate = this.getDistinctNames();
        this.citiesWithoutDuplicate = this.getDistinctCities();

        this.subscriptionService.getAllSubscriptionsForPatient(this.authService.getLoggedUserId()).subscribe(data =>
          this.mySubscriptions = data);
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Trenutno ne postoji nijedna apoteka!', 'Zatvori');
        }
      }
    );
   
  }

  ngOnInit(): void {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.setFilterPreditct();
  }

  setFilterPreditct() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (this.dataSourceChangeIn == 1) {
        return data.name.toLowerCase().startsWith(filter) || data.address.toLowerCase().split(',')[0].startsWith(filter);
      } else if (this.dataSourceChangeIn == 2) {
        return data.averageGrade.toString().startsWith(filter);
      } else if (this.dataSourceChangeIn == 3) {
        return data.name.toLowerCase().includes(filter);
      } else if (this.dataSourceChangeIn == 4) {
        return data.address.toLowerCase().startsWith(filter);
      }       
    };
  }

  applySearch(event: Event) {

    this.setDefaultValuesForFilter();

    this.dataSource = new MatTableDataSource(this.pharmacies);
    this.setFilterPreditct();
    this.dataSourceChangeIn = 1;
    const filter = (event.target as HTMLInputElement).value
    this.searchInputLenght = filter.length;
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSourceAfterSearch = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSource.sort = this.sort;
  }
  
  onChangeGradeRangeFilter(value) {

    if (this.searchInputLenght > 0) {
      this.dataSource.filter = this.dataSourceAfterSearch.filter;
      this.setFilterPreditct();
      this.dataSourceChangeIn = 2;
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
      this.openSnackBar('Fltraciju je moguće vršiti samo nakon pretrage po nazivu ili mestu gde se nalazi apoteka!', 'Zatvori');
    }  
  }

  onChangeNameFilter(value) {

    if (this.searchInputLenght > 0) {
      this.setFilterPreditct();
      this.dataSourceChangeIn = 3;
      this.selectedName = value;
     
      if (value === undefined) {
        this.dataSource.filter = this.dataSourceAfterSearch.filter;
      } else {
        this.dataSource.filter = value.toLowerCase();
      }

    } else {
      this.setDefaultValuesForFilter();
      this.openSnackBar('Fltraciju je moguće vršiti samo nakon pretrage po nazivu ili mestu gde se nalazi apoteka!', 'Zatvori');
    }  
  }

  onChangeCityFilter(value) {

    if (this.searchInputLenght > 0) {
      this.setFilterPreditct();
      this.dataSourceChangeIn = 4;
      this.selectedCity = value;

      if (value === undefined) {
        this.dataSource.filter = this.dataSourceAfterSearch.filter;
      } else {
        this.dataSource.filter = value.toLowerCase();
      } 

    } else {
      this.setDefaultValuesForFilter();
      this.openSnackBar('Fltraciju je moguće vršiti samo nakon pretrage po nazivu ili mestu gde se nalazi apoteka!', 'Zatvori');
    }  
  }

  getDistinctNames() : string[] {
    for (var n of this.pharmacies) {
      this.names.push(n.name)
    } 
    return Array.from(this.names.reduce((m, t) => m.set(t, t), new Map()).values());
  }

  getDistinctCities() : string[] {
    for (var n of this.pharmacies) {
      this.cities.push(n.address.split(',')[0].trim())
    } 
    return Array.from(this.cities.reduce((m, t) => m.set(t, t), new Map()).values());
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  setDefaultValuesForFilter() : void {
    this.selectedGradeRange = null;
    this.selectedName = null;
    this.selectedCity = null;
  }

  subscribeClick(pharmacy) : void {
    this.subscriptionService.subscribeToPharmacy(new Subscription(0, this.authService.getLoggedUserId(), null,
    pharmacy.id, null)).subscribe(data => {
      this.snackBar.open('Apoteka je dodata u listu vaših pretplata!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
       this.subscriptionService.getAllSubscriptionsForPatient(this.authService.getLoggedUserId()).subscribe(data =>
        this.mySubscriptions = data);
    })
  }

  isAlreadySubscribed(pharmacy): boolean {
    for (let s of this.mySubscriptions) {
      if (s.pharmacy.id == pharmacy.id) {
        return true;
      }
    }
    return false;
  }

  viewProfileClick(pharmacy): void {
    this.router.navigate(['/auth/pharmacy-administrator/pharmacy-profile'], {queryParams: {pharmacyId: pharmacy.id, tab: 0}});
  }
}
