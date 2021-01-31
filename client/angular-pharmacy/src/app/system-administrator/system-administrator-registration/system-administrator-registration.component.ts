import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { SystemAdministratorService } from '../../services/users/system-administrator.service';

@Component({
  selector: 'app-system-administrator-registration',
  templateUrl: './system-administrator-registration.component.html',
  styleUrls: ['./system-administrator-registration.component.scss']
})
export class SystemAdministratorRegistrationComponent implements OnInit {

  public id : number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public password: string;
  public repeatPassword: string;
  public city: string;
  public street: string;
  public country: string;

  constructor(private systemAdministratorService : SystemAdministratorService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  registrationClick() : void {
    if (!this.checkPasswordMatch()) {
      this.snackBar.open('Lozinke se moraju poklapati!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
       return;
    }
    this.systemAdministratorService.registerSystemAdministrator(new User(0, this.firstName, this.lastName, this.city, this.country,
      this.street, this.email, this.phoneNumber, this.password)).subscribe(user => {
        this.snackBar.open('Administrator sistema je uspešno registrovan!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      })
  }

  checkPasswordMatch() : boolean {
    return this.password === this.repeatPassword;
  }


}
