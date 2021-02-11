import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { PharmacyMedicine } from '../../models/pharmacy-medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
import { PharmacyMedicineService } from '../../services/medicines/pharmacy-medicine.service';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';

@Component({
  selector: 'app-free-terms-for-pharmacy',
  templateUrl: './free-terms-for-pharmacy.component.html',
  styleUrls: ['./free-terms-for-pharmacy.component.scss']
})
export class FreeTermsForPharmacyComponent implements OnInit, AfterViewInit {

  displayedColumns = ['firstName', 'lastName', 'startTime', 'endTime', 'price'];

  public freeAppointments: Appointment[];
  public pharmacy: Pharmacy;

  @Input() pharmacyId: number;

  constructor(private pharmacyService: PharmacyService, private medicineService: MedicineService, private pharmacyMedicineService: PharmacyMedicineService, 
              private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.pharmacyService.getPharmacyById(this.pharmacyId).subscribe(
      data => {
        this.pharmacy = data;
        this.appointmentService.getFreeAppointmentForPharmacy(this.pharmacy.id).subscribe(
          data => {
            this.freeAppointments = data;
          }
        );
      }
    )
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.';
  }

}
