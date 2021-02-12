import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-free-appointments',
  templateUrl: './free-appointments.component.html',
  styleUrls: ['./free-appointments.component.scss']
})
export class FreeAppointmentsComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'startTime', 'endTime', 'price'];

  public freeAppointments: Appointment[];
  public pharmacy: Pharmacy;

  constructor(private pharmacyService: PharmacyService, private authService: AuthenticationService, private appointmentService: AppointmentService) {
    this.pharmacyService.getPharmacyByFullPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
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

  ngOnInit(): void {
  }

  convertDate(milliseconds : number): string {
    let d = new Date(milliseconds);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate(); 
    let h = d.getHours();
    let m = d.getMinutes();
    return  (day > 9 ? '' : '0') + day + '.' + (month > 9 ? '' : '0') + month + '.' + year + '.' + ' ' + h + ':' + m;
  }

  convertToDateTime(milliseconds : number): string {
    var time = new Date(milliseconds).getTime();
    var date = new Date(time);
    return date.toString();
  }

}
