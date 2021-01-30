import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { SupplierService } from '../../services/users/supplier.service';

@Component({
  selector: 'app-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.scss']
})
export class SupplierRegistrationComponent implements OnInit {

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

  constructor(private supplierService : SupplierService, private snackBar : MatSnackBar) { }

  registrationClick() : void {
    if (!this.checkPasswordMatch()) {
      this.snackBar.open('Lozinke se moraju poklapati!', null, { 
        duration : 3000, 
        verticalPosition: 'top'
       });
       return;
    }
    this.supplierService.registerSupplier(new User(0, this.firstName, this.lastName, this.city, this.country,
      this.street, this.email, this.phoneNumber, this.password)).subscribe(user => {
        this.snackBar.open('Dobavaljač je uspešno registrovan!', null, { 
          duration : 3000, 
          verticalPosition: 'top'
         });
      })
  }

  checkPasswordMatch() : boolean {
    return this.password === this.repeatPassword;
  }

  ngOnInit(): void {
  }

}
