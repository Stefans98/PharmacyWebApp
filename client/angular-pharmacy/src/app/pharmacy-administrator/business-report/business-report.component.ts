import { Component, OnInit } from '@angular/core';
import { SingleSeries } from '@swimlane/ngx-charts';
import { AnnualStatistics } from '../../models/annual-statistics.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AppointmentService } from '../../services/schedule/appointment.service';
import { AuthenticationService } from '../../services/users/authentication.service';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})

export class BusinessReportComponent implements OnInit {

  public pharmacy: Pharmacy;
  public annualStatistics: AnnualStatistics;

  view: any[] = [700, 400];
  public statData = [];
  public quartalStatData = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mesec';
  showYAxisLabel = true;
  yAxisLabel = 'Broj održanih pregleda';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private pharmacyService: PharmacyService, private authService: AuthenticationService, private appointmentService: AppointmentService) {
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.appointmentService.appointmentStatistic(this.pharmacy.id).subscribe(
          data => {
            this.annualStatistics = data;
             this.statData = [
              {
                "name": "Januar",
                "value": this.annualStatistics.january
              },
              {
                "name": "Februar",
                "value": this.annualStatistics.february
              },
              {
                "name": "Mart",
                "value": this.annualStatistics.march
              },
              {
                "name": "April",
                "value": this.annualStatistics.april
              },
              {
                "name": "May",
                "value": this.annualStatistics.may
              },
              {
                "name": "Jun",
                "value": this.annualStatistics.jun
              },
              {
                "name": "Jul",
                "value": this.annualStatistics.july
              },
              {
                "name": "Avgust",
                "value": this.annualStatistics.august
              },
              {
                "name": "Septembar",
                "value": this.annualStatistics.september
              },
              {
                "name": "Oktobar",
                "value": this.annualStatistics.october
              },
              {
                "name": "Novembar",
                "value": this.annualStatistics.november
              },
              {
                "name": "Decembar",
                "value": this.annualStatistics.december
              }
            ];
            this.quartalStatData = [
              {
                "name": "Prvi kvartal",
                "value": this.annualStatistics.january + this.annualStatistics.february + this.annualStatistics.march
              },
              {
                "name": "Drugi kvartal",
                "value": this.annualStatistics.april + this.annualStatistics.may + this.annualStatistics.jun
              },
              {
                "name": "Treći kvartal",
                "value": this.annualStatistics.july + this.annualStatistics.august + this.annualStatistics.september
              },
              {
                "name": "Četvrti kvartal",
                "value": this.annualStatistics.october + this.annualStatistics.november + this.annualStatistics.december
              }
            ];
          }
        );
      }
    );
    //Object.assign(this, { single })
  }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
