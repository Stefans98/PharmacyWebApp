import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { SystemAdministratorService } from '../../services/users/system-administrator.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-sys-admin-profile',
  templateUrl: './sys-admin-profile.component.html',
  styleUrls: ['./sys-admin-profile.component.scss']
})
export class SysAdminProfileComponent implements OnInit {

  public id : number;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public phoneNumber: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public city: string = '';
  public street: string = '';
  public country: string = '';

  constructor(private userService: UserService, private authService: AuthenticationService, private sysAdminService : SystemAdministratorService,
                private snackBar: MatSnackBar) {
    this.userService.getUserById(this.authService.getLoggedUserId()).subscribe(user =>
        this.fillData(user)
      ); 
  }

  fillData(user: User) : void {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.city = user.city;
    this.street = user.street;
    this.country = user.country;
    this.id = user.id;
  }

  ngOnInit(): void {
  }

  saveClick() : void {
    if (!this.checkPasswordMatch()) {
      this.snackBar.open('Lozinke se moraju poklapati!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
       return;
    }
    this.sysAdminService.updateSysAdmin(new User(this.id, this.firstName, this.lastName, this.city, this.country,
      this.street, this.email, this.phoneNumber, this.password)).subscribe(user => {
        this.snackBar.open('Profil administratora sistema je uspešno izmenjen!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
          });
      })
  }

  checkPasswordMatch() : boolean {
    return this.password === this.repeatPassword;
  }

  cancelClick() : void {
    
  }

}
