import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

export interface customerDetails {
  id_customer: number,
  fname: string,
  lname: string,
  email: string,
  phone:string,
  password: string,
  exp: number,
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  //customer_id: number,
  //id_customer: number,
  fname: string,
  lname: string,
  email: string,
  phone:string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthenticationService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  //save token
  public saveToken(token: string): void {
    localStorage.setItem('customerToken', token)
    this.token = token;
  }


  //get token
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('customerToken')
    }
    return this.token
  }

  //get customer details
  public getcustomerDetails(): customerDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  //Logged in
  public isLoggedIn(): boolean {
    const customer = this.getcustomerDetails()
    if (customer) {
      return customer.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  /**public isAdmin(): boolean {
    const customer = this.getcustomerDetails()
    if (customer.roles === Role.Admin) {
      return true
    } else {
      // this.router.navigateByUrl('/dashboard');
      return false
    }
  }*/

  private request(method: 'post' | 'get', type: 'login_customer' | 'register_customer' | 'profile', customer?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, customer);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(customer: TokenPayload) {
    return this.request('post', 'register_customer', customer);
  }

  public login(customer: TokenPayload) {
    return this.request('post', 'login_customer', customer);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  //logout
  public logout(): void {
    if (window.confirm('Are you sure you want to logout?')) {
    this.token = ''
    window.localStorage.removeItem('customerToken')
    this.router.navigateByUrl('/customer/login')
    } else{
      return
    }
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    }
    else {
      console.error('Server Side Error:', errorResponse);
    }
  }
}
