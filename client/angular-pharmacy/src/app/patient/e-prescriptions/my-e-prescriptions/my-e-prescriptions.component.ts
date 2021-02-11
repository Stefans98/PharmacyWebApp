import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { EPrescriptionItem } from '../../../models/e-prescription-item.model';
import { EPrescription } from '../../../models/e-prescription.model';
import { EPrescriptionService } from '../../../services/medicines/e-prescription.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-my-e-prescriptions',
  templateUrl: './my-e-prescriptions.component.html',
  styleUrls: ['./my-e-prescriptions.component.scss']
})
export class MyEPrescriptionsComponent implements OnInit, AfterViewInit {
  @ViewChild('t1Sort') t1Sort: MatSort;

  ePrescriptionStatus: string[] = ['Obrađen', 'Odbijen']
  selectedStatus = 'Poništi filtraciju';
  
  ePrescriptions : EPrescription[] = [];
  displayedColumns: string[] = ['code','ePrescriptionState', 'pharmacy', 'issuingDate', 'price', 'items'];
  dataSource = new MatTableDataSource(this.ePrescriptions);
  newDataSource = new MatTableDataSource(this.ePrescriptions);

  medicines : EPrescriptionItem[] = [];

  constructor(private ePrescriptionService : EPrescriptionService, private authService : AuthenticationService) {
    this.ePrescriptionService.getAllEPrescriptionsForPatient(authService.getLoggedUserId()).subscribe(data => {
      this.ePrescriptions = data;
      this.dataSource.data = this.ePrescriptions;
      this.newDataSource.data = this.ePrescriptions;
    })
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.t1Sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'issuingDate': return moment(item.issuingDate, "DD-MM-YYYY").toDate();
        default: return item[property];
      }
    };
    this.setFilterPreditct();
  }

  checkEPrescriptionState(state) : string {
    if (state === 'CONFIRMED') {
      return 'Obrađen';
    } else {
      return 'Odbijen';
    }
    
  }

  setFilterPreditct() {
    this.dataSource.filterPredicate = (data, filter: string) => {
        return this.checkEPrescriptionState(data.ePrescriptionState).includes(filter);     
    };
  }

  onChangeEPrescriptionFilter(value) {
      this.setFilterPreditct();
      this.selectedStatus = value;
      this.dataSource.filter = this.newDataSource.filter;

      if (this.selectedStatus === undefined) {
        this.dataSource.filter = this.newDataSource.filter;
      } else if (this.selectedStatus === 'Obrađen') {
        this.dataSource.filter = 'Obrađen';
      } else if (this.selectedStatus === 'Odbijen') {
        this.dataSource.filter = 'Odbijen';
      } 
  }

  showMedicines(element : EPrescription) : void {
    this.medicines = element.items;
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' +  year;
  }

  roundPrice(price : number) : number {
    return Math.round(price * 100) / 100;
  }
}
