import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pharmacy-profile',
  templateUrl: './pharmacy-profile.component.html',
  styleUrls: ['./pharmacy-profile.component.scss']
})
export class PharmacyProfileComponent implements OnInit {

  selected = new FormControl(0);
  pharmacyId: number;
  tab: number;

  constructor(private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pharmacyId = Number(this.route.snapshot.queryParamMap.get('pharmacyId'));
    this.tab = Number(this.route.snapshot.queryParamMap.get('tab'));
    this.selected = new FormControl(this.tab);   
  }
}
