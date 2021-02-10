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
  
  ePrescriptions : EPrescription[] = [];
  displayedColumns: string[] = ['pharmacy', 'issuingDate', 'price', 'items'];
  dataSource = new MatTableDataSource(this.ePrescriptions);

  medicines : EPrescriptionItem[] = [];

  constructor(private ePrescriptionService : EPrescriptionService, private authService : AuthenticationService) {
    this.ePrescriptionService.getAllEPrescriptionsForPatient(authService.getLoggedUserId()).subscribe(data => {
      this.ePrescriptions = data;
      this.dataSource.data = this.ePrescriptions;
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
}
