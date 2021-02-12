import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Medicine } from '../../models/medicine.model';
import { Pharmacy } from '../../models/pharmacy.model';
import { PharmacyService } from '../../services/pharmacy/pharmacy.service';
import { AuthenticationService } from '../../services/users/authentication.service';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import { PharmacyFull } from '../../models/pharmacy-full.model';
import { UserService } from '../../services/users/user.service';
import { ResetPassword } from '../../models/reset-password.model';
import { PharmacyAdminChangePasswordComponent } from './pharmacy-admin-change-password/pharmacy-admin-change-password.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pharmacy-administrator-my-pharmacy',
  templateUrl: './pharmacy-administrator-my-pharmacy.component.html',
  styleUrls: ['./pharmacy-administrator-my-pharmacy.component.scss']
})
export class PharmacyAdministratorMyPharmacyComponent implements OnInit, AfterViewInit {
  map;
  ol;

  public medicineList: Medicine[] = [{id: 1, code: '123', name: 'Brufen', manufacturer: '', medicineType: 0,  medicineForm: 0,  
                                    averageGrade : 0.0, additionalInformation : '', points : 0, onPrescription : false, 
                                    medicineSpecification: null},
                                     {id: 2, code: '321', name: 'Nimulid', manufacturer: '', medicineType: 0,  medicineForm: 0, 
                                     averageGrade : 0.0, additionalInformation : '', points : 0, onPrescription : false,
                                      medicineSpecification: null}];

  public pharmacy: PharmacyFull;
  public id: number;
  public name: string;
  public country: string;
  public city: string;
  public street: string;
  public description: string;
  public averageGrade: number;
  public lng: number;
  public lat: number;

  public resetPasswordData : ResetPassword;

  constructor(private pharmacyService: PharmacyService, private authService: AuthenticationService, private userService: UserService, private dialog: MatDialog) {
    this.userService.getPasswordResetDataForUser(authService.getLoggedUserId()).subscribe(
      data => {
        this.resetPasswordData = data;
        this.pharmacyService.getPharmacyByFullPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            console.log(this.pharmacy.longitude);
            console.log(this.pharmacy.latitude);
            this.prepareDate(this.pharmacy);
            this.initMap(); 
          }
        );
        if(this.resetPasswordData.passwordReset == false) { // First login
          this.openDialog();
        }
      }
    );
  }

  prepareDate(pharmacy: PharmacyFull) : void {
    this.id = pharmacy.id;
    this.name = pharmacy.name;
    this.description = pharmacy.description;
    this.country = pharmacy.country; 
    this.city = pharmacy.city;
    this.street = pharmacy.street;
    this.averageGrade = pharmacy.averageGrade;
    this.lng = pharmacy.longitude;
    this.lat = pharmacy.latitude;
  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit():void {
    //
  }

  initMap(){
    
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM("OpenStreetMap")
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.pharmacy.longitude, this.pharmacy.latitude]),
        zoom: 17
      }) 
    });
  }

  updatePharmacy(){
    var pharmacy = new Pharmacy(this.pharmacy.id, this.name, this.city, this.country, this.street, this.description, this.averageGrade, this.pharmacy.address, this.pharmacy.price);
    this.pharmacyService.updatePharmacy(pharmacy, this.lng, this.lat).subscribe(
      data => {
        this.pharmacyService.getPharmacyByFullPharmacyAdminId(this.authService.getLoggedUserId()).subscribe(
          data => {
            this.pharmacy = data;
            console.log(this.pharmacy.longitude);
            console.log(this.pharmacy.latitude);
            this.prepareDate(this.pharmacy);
          }
        )
      }
    );
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PharmacyAdminChangePasswordComponent,{
      panelClass: 'my-centered-dialog',
      width: '550px',
      height: '365px',
      position: {left: '600px'},
      disableClose: true
    });
  }

}
