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

  
  //get orders distinct reference id
  getAllDistinctOrders():Observable<any>{
    return this.http.get(this.server_url +'/orders_distinct').pipe(catchError(this.handleError));
  }
  //get all orders
  getAllOrders(numberofResults: number = 100):Observable<any> {
    return this.http.get(this.server_url +'/orders', {
      params:{
        limit: numberofResults.toString()
      }
    }).pipe(catchError(this.handleError));
  }

  //get single order by its id
  getSingleOrder(orderID: Number){
    return this.http.get<ProductResponseModel[]>(`${this.server_url}/orders/${orderID}`).toPromise();
  }

  //get single order by its id
  getSingleOrderById(orderID: Number){
    return this.http.get<ProductResponseModel[]>(this.server_url + '/orders/' + orderID)
    .pipe(catchError(this.handleError));
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

  updateOrder(updateInfo: any): Observable<any>{
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.server_url+ '/update',updateInfo,{headers: headers}).pipe(catchError(this.handleError))
   } 

 //cancel order
 cancelOrder(updateInfo: any): Observable<any>{
  var headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
   return this.http.post(this.server_url+ '/cancel',updateInfo,{headers: headers}).pipe(catchError(this.handleError))
 } 

  //capture errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
       
     
      console.error('Server Side Error:', errorResponse.message);
    }
    return throwError('There is an error with this service. Please notify your systems admin if it persists')

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