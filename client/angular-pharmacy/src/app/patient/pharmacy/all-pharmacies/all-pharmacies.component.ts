import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  grade: number;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Zegin', grade: 9.7, address: 'Novi Sad, Mise Dimitrijevica 1'},
  {name: 'Benu', grade: 6.7, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Jankovic apoteka', grade: 8.7, address: 'Novi Sad, Mise Dimitrijevica 1'},
  {name: 'Markovic apoteka', grade: 7.9, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Saric apoteka', grade: 9.2, address: 'Stara Pazova, Mise Dimitrijevica 1'},
  {name: 'Zegin', grade: 9.7, address: 'Novi Sad, Mise Dimitrijevica 1'},
  {name: 'Benu', grade: 6.7, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Jankovic apoteka', grade: 8.7, address: 'Novi Sad, Mise Dimitrijevica 2'},
  {name: 'Markovic apoteka', grade: 7.9, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Saric apoteka', grade: 9.2, address: 'Stara Pazova, Mise Dimitrijevica 1'},
  {name: 'Zegin', grade: 9.7, address: 'Novi Sad, Mise Dimitrijevica 1'},
  {name: 'Benu', grade: 6.7, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Jankovic apoteka', grade: 8.7, address: 'Novi Sad, Mise Dimitrijevica 2'},
  {name: 'Markovic apoteka', grade: 7.9, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Saric apoteka', grade: 9.2, address: 'Stara Pazova, Mise Dimitrijevica 1'},
  {name: 'Zegin', grade: 9.7, address: 'Novi Sad, Mise Dimitrijevica 1'},
  {name: 'Benu', grade: 6.7, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Jankovic apoteka', grade: 8.7, address: 'Novi Sad, Mise Dimitrijevica 2'},
  {name: 'Markovic apoteka', grade: 7.9, address: 'Beograd, Mise Dimitrijevica 1'},
  {name: 'Saric apoteka', grade: 9.2, address: 'Stara Pazova, Mise Dimitrijevica 1'}
];

@Component({
  selector: 'app-all-pharmacies',
  templateUrl: './all-pharmacies.component.html',
  styleUrls: ['./all-pharmacies.component.scss']
})
export class AllPharmaciesComponent implements OnInit, AfterViewInit {
  checked = false;
  indeterminate = false;
  selectedGradeRange = 'Ništa od navedenog';

  displayedColumns: string[] = ['name', 'grade', 'address'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  newDataSource = new MatTableDataSource(ELEMENT_DATA);

  grade_ranges: string[] = ['5 - 6', '6 - 7', '7 - 8', '8 - 9', '9 - 10']

  constructor() { }

  ngOnInit(): void {
  }



  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.address.toLowerCase().split(',')[0].includes(filter); };
  }

  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.newDataSource = new MatTableDataSource(this.dataSource.filteredData);
    //this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
  }
  
  onChangeGradeRangeFilter(value) {
    this.selectedGradeRange = value;
    console.log(this.selectedGradeRange);

    // if (this.selectedGradeRange === "5 - 6") {

    // } else if (this.selectedGradeRange === "6 - 7") {
 
    // } else if (this.selectedGradeRange === "7 - 8") {

    // } else if (this.selectedGradeRange === "8 - 9") {

    // } else  {
 
    // }

  }

}
