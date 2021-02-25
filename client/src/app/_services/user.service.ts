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
      .pipe(catchError(this.handleError));
  }

  getSingleUser(userId: Number): Observable<UserModelServer> {
    return this.http
      .get<UserModelServer>(this.server_url + '/users/' + userId)
      .pipe(catchError(this.handleError));
  }

  //capture errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }
    return throwError(
      'There is an error with the sermon. Please notify your systems admin if it persists'
    );
  }

}
