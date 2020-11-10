import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: ProductResponseModel[] = [];
  private o
  private server_url = environment.serverURL

  constructor(private http: HttpClient) { }

  //get single order by its id
  getSingleOrder(orderID: Number){
    return this.http.get<ProductResponseModel[]>(`${this.server_url}/orders/${orderID}`).toPromise();
  }

  //get order by user id
  getLatestOrderById(customerID: Number){
    return this.http.get<ProductResponseModel[]>(this.server_url + '/order_latest/' + customerID)
    .pipe(catchError(this.handleError));
  }

  //get all fulfilled orders by customer ID
getFulFilledOrdersById(customerID: Number){
  return this.http.get('');
}
  //get all cancelled orders by customer ID
  getCancelledOrdersById(customerID: Number){
    return this.http.get('');
  }

  //get all payment modes 
  getAllPaymentModes(): Observable<any> {
    return this.http.get(this.server_url +'/payment-modes', {
      
    }).pipe(catchError(this.handleError));
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


  

  interface ProductResponseModel{
    id_product:number;
    prod_name:string;
    prod_description:string;
    product_price:number;
    quantityOrdered: number;
    image:string;
  }