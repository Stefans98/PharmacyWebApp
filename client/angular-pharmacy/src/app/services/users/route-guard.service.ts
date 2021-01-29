import { Injectable } from '@angular/core';
import { 
  Router,
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class RouteGuardService implements CanLoad
{  

  constructor(public auth: AuthenticationService, public router: Router) {}  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  CanLoad(route: ActivatedRouteSnapshot): boolean { 
    
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