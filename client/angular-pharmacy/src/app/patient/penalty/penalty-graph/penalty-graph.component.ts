import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../services/users/authentication.service';
import { PatientService } from '../../../services/users/patient.service';
declare const Chart;

@Component({
  selector: 'app-penalty-graph',
  templateUrl: './penalty-graph.component.html',
  styleUrls: ['./penalty-graph.component.scss']
})
export class PenaltyGraphComponent implements OnInit {
  penalty: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar, private patientService: PatientService, private authenticationService: AuthenticationService) { 
  }

  ngOnInit() {
    this.patientService.getPenaltiesByPatientId(this.authenticationService.getLoggedUserId()).subscribe(
      data => {
        this.penalty = data;
        setTimeout(() => {
          this.createChart();
        }, 250)
      },
      error => {
        if (error.status == 404){
          this.openSnackBar('Trenutno ne postoji nijedan rezervisani lek!', 'Zatvori', 3200);
        }
      }
    );
  }

  createChart() {
    new Chart('graph-penalty', {
      type: 'doughnut',
      data: {
        labels: ['Vaši penali (trenutni mesec) ', 'Dozvoljeno penala (mesečno)'],
        datasets: [{
          data: [this.penalty, 2],
          backgroundColor: [
            'rgba(255, 99, 132,.7)',
            'rgba(38, 166, 154,.7)'
          ],
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0.0000001
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'UVID U PENALE ZA TRENUTNI MESEC',
          fontSize: 20
        },
        legend: {
          display: true,
          labels:{
            fontSize: 15
        }
        },
        maintainAspectRatio: false
      }
    })
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}