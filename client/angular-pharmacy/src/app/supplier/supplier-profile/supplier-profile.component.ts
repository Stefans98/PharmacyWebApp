import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/users/authentication.service';
import { SupplierService } from '../../services/users/supplier.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit {

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

  constructor(private userService: UserService, private authService: AuthenticationService, private supplierService: SupplierService,
                private snackBar: MatSnackBar, private router: Router) {
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
    this.supplierService.updateSupplier(new User(this.id, this.firstName, this.lastName, this.city, this.country,
      this.street, this.email, this.phoneNumber, this.password)).subscribe(user => {
        this.snackBar.open('Profil dobavljača je uspešno izmenjen!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
         if (this.password.length > 0) {
          this.authService.logout();
          this.router.navigate(['login']);
        }
      })
  }

  cancelClick() : void {
    
  }

}
