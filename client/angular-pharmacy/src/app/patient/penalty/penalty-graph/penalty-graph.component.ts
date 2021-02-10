import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { PatientService } from '../../../services/users/patient.service';
// declare const Chart;

@Component({
  selector: 'app-penalty-graph',
  templateUrl: './penalty-graph.component.html',
  styleUrls: ['./penalty-graph.component.scss']
})
export class PenaltyGraphComponent implements OnInit {
  
  @ViewChild('ele', { static: true }) el: ElementRef;

	public penaltyData = [];
	public showLegend = true;
	public colorScheme = {
		domain: ['rgba(38, 166, 154, .9)',
            'rgba(255, 99, 132, .9)',]
	};
	public showLabels = false;
	public explodeSlices = false;
	public doughnut = true;
	public view: any[] = [];
  public width: number;

  penalty: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private patientService: PatientService, private authenticationService: AuthenticationService) { 
  }

  ngOnInit() {
    this.patientService.getPenaltiesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.penalty = data;
        this.view = [this.el.nativeElement.offsetWidth, 335];
        this.penaltyData = [
          {
            "name": "Dozvoljeno",
            "value": 2
          },
          {
            "name": "Penali",
            "value": this.penalty
          }
        ];
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Trenutno ne postoji nijedan rezervisani lek!', 'Zatvori', 3200);
        }
      }
    );
  }

  ngDoCheck() {
		if (this.el.nativeElement.offsetWidth != this.width) {
			this.width = this.el.nativeElement.offsetWidth;
			this.ngOnInit();
		}
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}