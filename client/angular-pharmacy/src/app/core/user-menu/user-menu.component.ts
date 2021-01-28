import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;
	role: string = localStorage.getItem('userRole');	

  	@Input() currentUser = null;
  	@HostListener('document:click', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		this.isOpen = false;
    	}
  	}  	
    
  	constructor(private elementRef: ElementRef, private router: Router) { }

  	ngOnInit() {
	  }
	  
	logoutClick() : void {
		localStorage.removeItem('token');
		localStorage.removeItem('userRole');
		localStorage.removeItem('userId');
		localStorage.removeItem('email');

		this.router.navigate(['login']);
	}
}
