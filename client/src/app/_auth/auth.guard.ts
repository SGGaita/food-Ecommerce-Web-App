import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  //canActivate for admin
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.auth.isLoggedIn()){
        //this.router.navigate(['dashboard'],{queryParams: {returnUrl: state.url}});
        return true;
      }        
      this.router.navigate(['admin'],{queryParams: {returnUrl: state.url}}); 
      return false;
  }

  
}
