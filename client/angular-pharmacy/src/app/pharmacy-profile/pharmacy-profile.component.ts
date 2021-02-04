import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.scss']
})
export class PharmacyProfileComponent implements OnInit {

  selected = new FormControl(3);

  constructor() { }

  ngOnInit(): void {
  }

}
