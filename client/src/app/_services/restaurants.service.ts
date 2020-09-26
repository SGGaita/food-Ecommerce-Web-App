import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SupplierModelServer } from '../_models/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private server_url = environment.serverURL

  constructor(private http:HttpClient) { }

  // retrieving restaurant
  getAllSuppliers(numberofResults: number = 10):Observable<any> {
    return this.http.get(this.server_url +'/suppliers', {
      params:{
        limit: numberofResults.toString()
      }
    }).pipe(catchError(this.handleError));
  }

  //retrieving restaurant by ID
  getSingleRestaurant(productId: Number): Observable<SupplierModelServer> {
    return this.http
      .get<SupplierModelServer>(this.server_url + '/suppliers/' + productId)
      .pipe(catchError(this.handleError));
  }

  //capture errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }
    return throwError('There is an error with the sermon. Please notify your systems admin if it persists')

  }
  
}
