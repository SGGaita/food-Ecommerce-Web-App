import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CustomerAuthenticationService} from './customer-authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthCustGuard implements CanActivate {
  constructor(private auth_cust: CustomerAuthenticationService, private router: Router) { }

  //canActivate for admin
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.auth_cust.isLoggedIn()){
        //this.router.navigateByUrl('/dashboard');
        return true;
      }        
      this.router.navigateByUrl('/customer/login');  
      return false;
  }
  
}
