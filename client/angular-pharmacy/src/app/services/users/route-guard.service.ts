import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class RouteGuardService implements CanActivate 
{  

  constructor(public auth: AuthService, public router: Router) {}  

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