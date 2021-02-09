import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SingleSeries } from '@swimlane/ngx-charts';
import { AnnualStatistics } from '../../models/annual-statistics.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { MedicineService } from '../../services/medicines/medicine.service';
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
  public annualStatisticsMedicines: AnnualStatistics;

  view: any[] = [700, 400];
  public statData = [];
  public quartalStatData = [];
  public annualStatData: number = 0;

  public statDataMedicine = [];
  public quartalStatDataMedicine = [];
  public annualStatDataMedicine: number = 0;

  public profit: number = 0;
  public profitData = [];

  public today: Date;
  public startDate: Date;
  public endDate: Date;

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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private pharmacyService: PharmacyService, private authService: AuthenticationService, private appointmentService: AppointmentService, 
              private medicineService: MedicineService) {
    this.today = new Date();

    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.appointmentService.appointmentStatistic(this.pharmacy.id).subscribe(
          data => {
            this.annualStatistics = data;
            this.annualStatData = this.annualStatistics.january + this.annualStatistics.february + this.annualStatistics.march +
                                  this.annualStatistics.april + this.annualStatistics.may + this.annualStatistics.jun +
                                  this.annualStatistics.july + this.annualStatistics.august + this.annualStatistics.september +
                                  this.annualStatistics.october + this.annualStatistics.november + this.annualStatistics.december;
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

    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.medicineService.medicineStatistic(this.pharmacy.id).subscribe(
          data => {
            this.annualStatisticsMedicines = data;
            this.annualStatDataMedicine = this.annualStatisticsMedicines.january + this.annualStatisticsMedicines.february + this.annualStatisticsMedicines.march +
                                          this.annualStatisticsMedicines.april + this.annualStatisticsMedicines.may + this.annualStatisticsMedicines.jun +
                                          this.annualStatisticsMedicines.july + this.annualStatisticsMedicines.august + this.annualStatisticsMedicines.september +
                                          this.annualStatisticsMedicines.october + this.annualStatisticsMedicines.november + this.annualStatisticsMedicines.december;
            this.statDataMedicine = [
              {
                "name": "Januar",
                "value": this.annualStatisticsMedicines.january
              },
              {
                "name": "Februar",
                "value": this.annualStatisticsMedicines.february
              },
              {
                "name": "Mart",
                "value": this.annualStatisticsMedicines.march
              },
              {
                "name": "April",
                "value": this.annualStatisticsMedicines.april
              },
              {
                "name": "May",
                "value": this.annualStatisticsMedicines.may
              },
              {
                "name": "Jun",
                "value": this.annualStatisticsMedicines.jun
              },
              {
                "name": "Jul",
                "value": this.annualStatisticsMedicines.july
              },
              {
                "name": "Avgust",
                "value": this.annualStatisticsMedicines.august
              },
              {
                "name": "Septembar",
                "value": this.annualStatisticsMedicines.september
              },
              {
                "name": "Oktobar",
                "value": this.annualStatisticsMedicines.october
              },
              {
                "name": "Novembar",
                "value": this.annualStatisticsMedicines.november
              },
              {
                "name": "Decembar",
                "value": this.annualStatisticsMedicines.december
              }
            ];
            this.quartalStatDataMedicine = [
              {
                "name": "Prvi kvartal",
                "value": this.annualStatisticsMedicines.january + this.annualStatisticsMedicines.february + this.annualStatisticsMedicines.march
              },
              {
                "name": "Drugi kvartal",
                "value": this.annualStatisticsMedicines.april + this.annualStatisticsMedicines.may + this.annualStatisticsMedicines.jun
              },
              {
                "name": "Treći kvartal",
                "value": this.annualStatisticsMedicines.july + this.annualStatisticsMedicines.august + this.annualStatisticsMedicines.september
              },
              {
                "name": "Četvrti kvartal",
                "value": this.annualStatisticsMedicines.october + this.annualStatisticsMedicines.november + this.annualStatisticsMedicines.december
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

  calculateProfit(){
    this.profit = 0;
    if(this.startDate > this.endDate){
      this.openSnackBar('Datum početka mora biti pre datuma kraja!', 'Zatvori');
      return;
    }
    var parsedStartDate = Date.parse(this.startDate.toString());
    var parsedEndTime = Date.parse(this.endDate.toString());
    this.pharmacyService.getPharmacyByPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
      data => {
        this.pharmacy = data;
        this.medicineService.calculatePharmacyProfit(this.pharmacy.id, parsedStartDate.toString(), parsedEndTime.toString()).subscribe(
          data => {
            this.annualStatistics = data;
            this.profit = this.annualStatistics.january;
            this.profitData = [
              {
                "name": "Profit",
                "value": this.profit
              }
            ]
          }
        );
      }
    );

  }

  onSelect(event) {
    console.log(event);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
