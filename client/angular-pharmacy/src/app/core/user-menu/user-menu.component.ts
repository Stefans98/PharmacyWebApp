import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/users/authentication.service';
import { PatientService } from '../../services/users/patient.service';
import { UserService } from '../../services/users/user.service';


@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;
	role: string = localStorage.getItem('userRole');
	loggedUserName: string;	

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
    

	constructor(private elementRef: ElementRef, private router: Router, private userService: UserService, 
						private authService: AuthenticationService) {
		this.userService.getUserById(authService.getLoggedUserId())
							.subscribe(user => this.loggedUserName = user.firstName + ' ' + user.lastName);
	}

  	ngOnInit() { }
	  
	logoutClick() : void {
		this.authService.logout();
		this.router.navigate(['login']);
	}
}
