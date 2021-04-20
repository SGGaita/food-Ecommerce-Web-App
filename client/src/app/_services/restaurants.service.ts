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
  errorMsg: string;

  constructor(private http:HttpClient) { }

  // retrieving restaurant
  getAllSuppliers(numberofResults: number = 10):Observable<any> {
    return this.http.get(this.server_url +'/suppliers', {
      params:{
        limit: numberofResults.toString()
      }
    }).pipe(catchError(error =>{
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

  //retrieving restaurant by ID
  getSingleRestaurant(productId: Number): Observable<SupplierModelServer> {
    return this.http
      .get<SupplierModelServer>(this.server_url + '/suppliers/' + productId)
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


  //activation update
  updateStatus(updateInfo: any): Observable<any>{
    var headers = new HttpHeaders();
  return this.http.post(this.server_url + '/activation',updateInfo)
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

//delete restaurant 
deleteRestaurant(id: any) {
  return this.http.delete(this.server_url + '/delete/' + id)
  .pipe(catchError(error =>{
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message};
      }`
    } else {
     errorMsg = this.getServerErrorMessage(error);
     }
    return throwError(errorMsg)
  }))
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
