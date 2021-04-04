import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserModelServer } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private server_url = environment.serverURL;

  constructor(private http: HttpClient) {}

  // retrieving products
  getUsers(numberofResults: number = 10): Observable<any> {
    return this.http
      .get(this.server_url + '/users', {
        params: {
          limit: numberofResults.toString(),
        },
      })
      .pipe(catchError(error =>{
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message};
          }`
        } else {
         errorMsg = this.getServerErrorMessage(error);
         }
        return throwError(errorMsg)
      }));
  }

  getSingleUser(userId: Number): Observable<UserModelServer> {
    return this.http
      .get<UserModelServer>(this.server_url + '/users/' + userId)
      .pipe(catchError(error =>{
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message};
          }`
        } else {
         errorMsg = this.getServerErrorMessage(error);
         }
        return throwError(errorMsg)
      }));
  }

  //Get Http server errors
  private getServerErrorMessage(errorResponse: HttpErrorResponse): string{
    switch (errorResponse.status) {
      case 404: {
        return `Not Found: ${errorResponse.message}`;
      }
      case 403: {
        return `Access Denied: ${errorResponse.message}`;
      }
      case 500: {
        return `Internal Server Error: ${errorResponse.message}`;
      }
      default:{
        return `Unknown Server Error: ${errorResponse.message}`
      }
    }
  }

}
