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
import { CustomersModelServer} from '../_models/customers' 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private server_url = environment.serverURL;

  constructor(private http: HttpClient) {}

//account activation
accActivation(id_customer: number): Observable<any>{
  return this.http.get(this.server_url + '/activation/' + id_customer)
  .pipe(catchError(this.handleError));
}

   // retrieving customers
   getCustomers(numberofResults: number = 10): Observable<any> {
    return this.http
      .get(this.server_url + '/customers', {
        params: {
          limit: numberofResults.toString(),
        },
      })
      .pipe(catchError(this.handleError));
  }

  getCustomerById(customerId: Number): Observable<CustomersModelServer> {
    return this.http
      .get<CustomersModelServer>(this.server_url + '/customers/' + customerId)
      .pipe(catchError(this.handleError));
  }

  getCustomerAddById(customerId: Number): Observable<CustomersModelServer> {
    return this.http
      .get<CustomersModelServer>(this.server_url + '/customers_add/' + customerId)
      .pipe(catchError(this.handleError));
  }

  //get products from one category
  getProductsFromCategory(catName: string): Observable<CustomersModelServer[]> {
    return this.http.get<CustomersModelServer[]>(this.server_url + 'products/category/' + catName)
    .pipe(catchError(this.handleError))
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
