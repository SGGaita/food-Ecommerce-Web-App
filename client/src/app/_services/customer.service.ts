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
import { CustomersModelServer } from '../_models/customers';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private server_url = environment.serverURL;

  constructor(private http: HttpClient) {}

  //account activation
  accActivation(id_customer: number): Observable<any> {
    return this.http.get(this.server_url + '/activation/' + id_customer).pipe(
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message};
      }`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return throwError(errorMsg);
      })
    );
  }

  // retrieving customers
  getCustomers(numberofResults: number = 10): Observable<any> {
    return this.http
      .get(this.server_url + '/customers', {
        params: {
          limit: numberofResults.toString(),
        },
      })
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message};
      }`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        })
      );
  }

  getCustomerById(customerId: Number): Observable<CustomersModelServer> {
    return this.http
      .get<CustomersModelServer>(this.server_url + '/customers/' + customerId)
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message};
      }`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        })
      );
  }

  getCustomerAddById(customerId: Number): Observable<CustomersModelServer> {
    return this.http
      .get<CustomersModelServer>(
        this.server_url + '/customers_add/' + customerId
      )
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message};
      }`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        })
      );
  }

  //update customer information
 updateCustomer(customerInfo: any): Observable<any>{
  var headers = new HttpHeaders();
return this.http.post(this.server_url + '/customer',customerInfo,{ headers: headers })
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
  private getServerErrorMessage(errorResponse: HttpErrorResponse): string {
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
      default: {
        return `Unknown Server Error: ${errorResponse.message}`;
      }
    }
  }
}
