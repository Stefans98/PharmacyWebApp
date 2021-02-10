import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-non-authenticated-user-menu',
  templateUrl: './non-authenticated-user-menu.component.html',
  styleUrls: ['./non-authenticated-user-menu.component.scss']
})
export class NonAuthenticatedUserMenuComponent implements OnInit {

  constructor(private elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
  }

}
