import { Injectable } from '@angular/core';
import { 
  Router,
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class RouteGuardService implements CanActivate 
{

  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean { 

    if (!this.auth.isAuthenticated() || localStorage.getItem('userRole') != route.data.role){

        if(localStorage.getItem('userRole') == 'PATIENT'){
            this.router.navigate(['/auth/patient/pharmacy/all-pharmacies']);
        }
        else if (localStorage.getItem('userRole') == 'DERMATOLOGIST') {
            this.router.navigate(['/auth/dermatologist/work-calendar']);
        }
        else {
            this.router.navigate(['login']);
        }
      return false;
    }
    return true;
  }}
