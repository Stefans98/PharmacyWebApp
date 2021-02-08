import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from '../../../models/subscription.model';
import { SubscriptionService } from '../../../services/pharmacy/subscription.service';
import { AuthenticationService } from '../../../services/users/authentication.service';

@Component({
  selector: 'app-my-pharmacies',
  templateUrl: './my-pharmacies.component.html',
  styleUrls: ['./my-pharmacies.component.scss']
})
export class MyPharmaciesComponent implements OnInit {

  subscriptions : Subscription[] = [];
  dataSource = new MatTableDataSource(this.subscriptions);
  displayedColumns: string[] = ['name', 'averageGrade', 'address', 'unsubscribe'];

  constructor(private subscriptionService: SubscriptionService, private authService: AuthenticationService, private snackBar: MatSnackBar) {
    this.fillTableValues();
   }

  ngOnInit(): void {
  }

  fillTableValues() : void {
    this.subscriptionService.getAllSubscriptionsForPatient(this.authService.getLoggedUserId()).subscribe(data => {
      this.subscriptions = data;
      this.dataSource.data = this.subscriptions;
    })
  }


  unsubscribeClick(subscription): void {
    this.subscriptionService.unsubscribeToPharmacy(subscription.id).subscribe(data => {
      this.snackBar.open('Pretplata je uspešno uklonjena!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
       this.fillTableValues();
    },
    error => {
      if (error.status == 404)
      {
        this.snackBar.open('Greška prilikom uklanjanja pretplate!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      }
    })
  }

}
