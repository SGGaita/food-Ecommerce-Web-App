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
  providedIn: 'root',
})
export class OrderService {
  private products: ProductResponseModel[] = [];
  private o;
  private server_url = environment.serverURL;

  constructor(private http: HttpClient) {}

  //get orders distinct reference id
  getAllDistinctOrders(): Observable<any> {
    return this.http.get(this.server_url + '/orders_distinct').pipe(
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
  //get all orders
  getAllOrders(numberofResults: number = 100): Observable<any> {
    return this.http
      .get(this.server_url + '/orders', {
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

  //get single order by its id
  getSingleOrder(orderID: Number) {
    return this.http
      .get<ProductResponseModel[]>(`${this.server_url}/orders/${orderID}`)
      .toPromise();
  }

  //get single order by its id
  getSingleOrderById(orderID: Number) {
    return this.http
      .get<ProductResponseModel[]>(this.server_url + '/orders/' + orderID)
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

  //get order by user id
  getLatestOrderById(customerID: Number) {
    return this.http
      .get<ProductResponseModel[]>(
        this.server_url + '/order_latest/' + customerID
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

  //get all fulfilled orders by customer ID
  getFulFilledOrdersById(customerID: Number) {
    return this.http.get('');
  }
  //get all cancelled orders by customer ID
  getCancelledOrdersById(customerID: Number) {
    return this.http.get('');
  }

  //get all payment modes
  getAllPaymentModes(): Observable<any> {
    return this.http.get(this.server_url + '/payment-modes', {}).pipe(
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

  updateOrder(updateInfo: any): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.server_url + '/update', updateInfo, { headers: headers })
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

  //cancel order
  cancelOrder(updateInfo: any): Observable<any> {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.server_url + '/cancel', updateInfo, { headers: headers })
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

interface ProductResponseModel {
  id_product: number;
  prod_name: string;
  prod_description: string;
  product_price: number;
  quantityOrdered: number;
  image: string;
}
