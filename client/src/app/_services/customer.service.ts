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

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private server_url = environment.serverURL;

  constructor(private http: HttpClient) {}

  // send confirmation email
  sendEmail(user): Observable<any> {
    console.log("You have hit the service")
    console.log("user object", user)
    return this.http.post(this.server_url + '/sendmail', user)
      .pipe(catchError(this.handleError));
  }

  //capture errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }
    let errMsg = errorResponse.statusText + errorResponse.url + "Not found"
    return throwError(
      errMsg
    );
  }
}
