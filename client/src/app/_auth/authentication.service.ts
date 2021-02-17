import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import 'rxjs/operators';
//import 'rxjs/add/operator/toPromise'; 
import { Router } from '@angular/router';
//import { Role } from '../_models/role.enum';

export interface UserDetails {
  user_id: number,
  fname: string,
  lname:string,
  userName: string,
  email: string,
  password: string,
  roles: string;
  exp: number,
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  //user_id: number,
  fname: string,
  lname: string;
  username: string,
  email: string,
  password: string,
  roles: string,
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  //save token
  public saveToken(token: string): void {
    localStorage.setItem('userToken', token)
    this.token = token;
  }


  //get token
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('userToken')
    }
    return this.token
  }

  //get user details
  public getUserDetails(): UserDetails {
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
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  /**public isAdmin(): boolean {
    const user = this.getUserDetails()
    if (user.roles === Role.Admin) {
      return true
    } else {
      // this.router.navigateByUrl('/dashboard');
      return false
    }
  }*/

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
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

  public register(user: TokenPayload) {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload) {
    console.log("User payload", user)
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  //logout
  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('userToken')
    this.router.navigateByUrl('/admin')
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
