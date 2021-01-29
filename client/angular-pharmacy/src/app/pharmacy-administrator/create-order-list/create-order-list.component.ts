import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Medicine } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicines/medicine.service';

@Component({
  selector: 'app-create-order-list',
  templateUrl: './create-order-list.component.html',
  styleUrls: ['./create-order-list.component.scss']
})

export class CreateOrderListComponent implements OnInit {
  medicines = new FormControl();
  public medicineList: Medicine[] = [{code: '123', name: 'Brufen'},
                                     {code: '321', name: 'Nimulid'}];
  public newMedicineList: Medicine[] = [];
  //public medicineList: Medicine[] = [];

  displayedColumns: string[] = ['code', 'name', 'amount', 'add'];

  constructor(private medicineService: MedicineService) {
    /*this.medicineService.getAll().subscribe(
      data => {
        this.medicineList = data;
      }
    );*/
   }

  addMedicine(med):void{
    console.log(med.name);
    this.newMedicineList.push(med);
  }

  ngOnInit(): void {
  }

}
