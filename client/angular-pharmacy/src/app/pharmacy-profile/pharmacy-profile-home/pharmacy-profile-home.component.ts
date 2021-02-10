import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-pharmacy-profile-home',
  templateUrl: './pharmacy-profile-home.component.html',
  styleUrls: ['./pharmacy-profile-home.component.scss']
})
export class PharmacyProfileHomeComponent implements OnInit, AfterViewInit {
  
  public pharmacy: PharmacyFull;
  name: string;
  public scaledPharmacyAverageGrade: number;
  @Input() pharmacyId: number;

  map;
  ol;

  public id: number;
  public country: string;
  public city: string;
  public street: string;
  public description: string;
  public averageGrade: number;
  public lng: number;
  public lat: number;

  constructor(private authService: AuthenticationService, private pharmacyService: PharmacyService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.pharmacyService.getFullPharmacyById(this.pharmacyId).subscribe(
      data => {
        this.pharmacy = data;
        this.name = this.pharmacy.name;
        this.prepareDate(this.pharmacy);
        this.initMap();
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

}
