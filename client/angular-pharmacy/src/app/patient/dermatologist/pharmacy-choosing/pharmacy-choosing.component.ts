import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pharmacy } from '../../../models/pharmacy.model';
import { Subscription } from '../../../models/subscription.model';
import { PharmacyService } from '../../../services/pharmacy/pharmacy.service';

@Component({
  selector: 'app-pharmacy-choosing',
  templateUrl: './pharmacy-choosing.component.html',
  styleUrls: ['./pharmacy-choosing.component.scss']
})
export class PharmacyChoosingComponent implements OnInit {
  checked = false;
  indeterminate = false;

  mySubscriptions : Subscription[] = [];

  dataSourceChangeIn = 1;
  searchInputLenght = 0;

  pharmacies: Pharmacy[] = [];
  displayedColumns: string[] = ['name', 'averageGrade', 'address', 'subscribe'];
  dataSource = new MatTableDataSource(this.pharmacies);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacyService: PharmacyService, private router : Router) {
    this.pharmacyService.getAllPharmacies().subscribe(
      data => {
        this.pharmacies = data;
        this.dataSource.data = this.pharmacies;
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
      }      
    };
  }

  applySearch(event: Event) {

    this.dataSource = new MatTableDataSource(this.pharmacies);
    this.setFilterPreditct();
    this.dataSourceChangeIn = 1;
    const filter = (event.target as HTMLInputElement).value
    this.searchInputLenght = filter.length;
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  choosePharmacy(pharmacy) : void {
    this.router.navigate(['/auth/pharmacy-administrator/pharmacy-profile'], {queryParams: {pharmacyId: pharmacy.id, tab: 7}});
  }
}