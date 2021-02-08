import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicine } from '../../../models/medicine.model';
import { MedicineService } from '../../../services/medicines/medicine.service';
import { MedicinePharmacyModalDialogComponent } from './medicine-pharmacy-modal-dialog/medicine-pharmacy-modal-dialog.component';
import { SpecificationModalDialogComponent } from './specification-modal-dialog/specification-modal-dialog.component';

@Component({
  selector: 'app-all-medicines',
  templateUrl: './all-medicines.component.html',
  styleUrls: ['./all-medicines.component.scss']
})
export class AllMedicinesComponent implements OnInit {

  allMedicines : Medicine[] = [];
  dataSource = new MatTableDataSource(this.allMedicines);
  newDataSource = new MatTableDataSource(this.allMedicines);
  dataSourceAfterSearch = new MatTableDataSource(this.allMedicines);

  dataSourceChangeIn = 1;
  searchInputLenght = 0;

  displayedColumns: string[] = ['code', 'name', 'type', 'form', 'grade', 'specification', 'pharmacies'];

  gradeRanges: string[] = ['5 - 6', '6 - 7', '7 - 8', '8 - 9', '9 - 10', '10'];
  selectedGradeRange : string;
  medicineTypes: string[] = ['antibiotik', 'anelgetik', 'antihistaminik', 'vakcina', 'antiseptik', 'antipiretik', 'sedativ', 'vitamini'];
  selectedType: string;
  medicineForms: string[] = ['sirup', 'tableta', 'kapsula', 'kapi', 'sprej', 'krema', 'prašak', 'ulje', 'suspenzija'];
  selectedForm: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog : MatDialog, private medicineService : MedicineService) {
    this.medicineService.getAll().subscribe(data => {
      this.allMedicines = data;
      this.dataSource.data = this.allMedicines;
    })
   }

  ngOnInit(): void {
  }

  translateMedicineType(type : string) : string {
    if (type == 'ANTIBIOTIC') {
      return 'antibiotik';
    } else if (type == 'ANALGESIC') {
      return 'anelgetik';
    } else if (type == 'ANTIHISTAMINE') {
      return 'antihistaminik';
    } else if (type == 'VACCINE') {
      return 'vakcina';
    } else if (type == 'ANTISEPTIC') {
      return 'antiseptik';
    } else if (type == 'ANTIPYRETIC') {
      return 'antipiretik';
    } else if (type == 'TRANQUILISER') {
      return 'sedativ';
    } else {
      return 'vitamini';
    }
  }

  translateMedicineForm(type : string) : string {
    if (type == 'SYRUP') {
      return 'sirup';
    } else if (type == 'TABLET') {
      return 'tableta';
    } else if (type == 'CAPSULES') {
      return 'kapsula';
    } else if (type == 'DROPS') {
      return 'kapi';
    } else if (type == 'SPRAY') {
      return 'sprej';
    } else if (type == 'CREAM') {
      return 'krema';
    } else if (type == 'POWDER') {
      return 'prašak';
    } else if (type == 'OILS') {
      return 'ulje';
    } else {
      return 'suspenzija';
    }
  }

  showSpecificationClick(element : Medicine) : void {
    const dialogRef = this.dialog.open(SpecificationModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '650px',
      data: element.medicineSpecification
    });
  }

  showPharmaciesClick(element : Medicine) : void {
    const dialogRef = this.dialog.open(MedicinePharmacyModalDialogComponent,  {
      panelClass: 'my-centered-dialog',
      width: '650px',
      height: '450px',
      data: element.code
    });
  }

  applySearch(event: Event) {

    this.setDefaultValuesForFilter();

    this.dataSource = new MatTableDataSource(this.allMedicines);
    this.setFilterPredicate();
    this.dataSourceChangeIn = 1;
    const filter = (event.target as HTMLInputElement).value
    this.searchInputLenght = filter.length;
    this.dataSource.filter = filter.trim().toLowerCase();
    this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSourceAfterSearch = new MatTableDataSource(this.dataSource.filteredData);
    this.dataSource.sort = this.sort;
  }

  setDefaultValuesForFilter() : void {
    this.selectedGradeRange = null;
    this.selectedType = null;
    this.selectedForm = null;
  }

  onChangeGradeRangeFilter(value) {

    this.dataSource.filter = this.dataSourceAfterSearch.filter;
    this.setFilterPredicate();
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
  }

  onChangeTypeFilter(value) {

    this.setFilterPredicate();
    this.dataSourceChangeIn = 2;
    this.selectedType = value;
    
    if (value === undefined) {
      this.dataSource.filter = this.dataSourceAfterSearch.filter;
    } else if (this.selectedType == 'antibiotik') {
      this.dataSource.filter = 'antibiotic';
    } else if (this.selectedType == 'anelgetik') {
      this.dataSource.filter ='analgesic';
    } else if (this.selectedType == 'antihistaminik') {
      this.dataSource.filter ='antihistamine';
    } else if (this.selectedType == 'vakcina') {
      this.dataSource.filter = 'vaccine';
    } else if (this.selectedType == 'antiseptik') {
      this.dataSource.filter = 'antiseptic';
    } else if (this.selectedType == 'antipiretik') {
      this.dataSource.filter = 'antipyretic';
    } else if (this.selectedType == 'sedativ') {
      this.dataSource.filter = 'tranquiliser';
    } else {
      this.dataSource.filter = 'vitamins';
    }
  }

  onChangeFormFilter(value) {

    this.setFilterPredicate();
    this.dataSourceChangeIn = 2;
    this.selectedType = value;
    
    if (value === undefined) {
      this.dataSource.filter = this.dataSourceAfterSearch.filter;
    } else if (this.selectedForm == 'sirup') {
      this.dataSource.filter = 'syrup';
    } else if (this.selectedForm == 'tableta') {
      this.dataSource.filter = 'tablet';
    } else if (this.selectedForm == 'kapsula') {
      this.dataSource.filter = 'capsule';
    } else if (this.selectedForm == 'kapi') {
      this.dataSource.filter = 'drops';
    } else if (this.selectedForm == 'sprej') {
      this.dataSource.filter = 'spray';
    } else if (this.selectedForm == 'krema') {
      this.dataSource.filter = 'cream';
    } else if (this.selectedForm == 'prašak') {
      this.dataSource.filter = 'powder';
    } else if (this.selectedForm == 'ulje') {
      this.dataSource.filter = 'oils';
    }else {
      this.dataSource.filter = 'suspension';
    }
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (this.dataSourceChangeIn == 1) {
        return data.name.toLowerCase().startsWith(filter);
      } else if (this.dataSourceChangeIn == 2) {
        return data.medicineType.toString().toLowerCase().startsWith(filter);
      } else if (this.dataSourceChangeIn == 3) {
        return data.medicineForm.toString().toLowerCase().startsWith(filter);
      }     
    };
  }

}
