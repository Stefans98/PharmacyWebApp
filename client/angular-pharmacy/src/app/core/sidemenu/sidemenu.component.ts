import { Component, OnInit, Input } from '@angular/core';
import { menus } from './menu-element';
import { dermatologistMenus } from './menu-element-dermatologist';
import { patientMenus } from './menu-element-patient';
import { pharmacistMenus } from './menu-element-pharmacist';
import { pharmacyAdministratorMenus } from './menu-element-pharmacy-administrator'; 
import { systemAdministratorMenus } from './menu-element-system-administrator';

@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})

export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    
    public menus = menus;
    public patientMenus = patientMenus;
    public pharmacistMenus = pharmacistMenus;
    public dermatologistMenus = dermatologistMenus;
    public pharmacyAdministratorMenus = pharmacyAdministratorMenus;
    public systemAdministratorMenus = systemAdministratorMenus;

    public userRole : String = '';

    constructor() { 
      this.userRole = localStorage.getItem('userRole');
    }

    ngOnInit() {
    }

}
