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
import { ProductModelServer } from '../_models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private server_url = environment.serverURL;

  constructor(private http: HttpClient) {}

  // retrieving sermons
  getProducts(numberofResults: number = 10): Observable<any> {
    return this.http
      .get(this.server_url + '/products', {
        params: {
          limit: numberofResults.toString(),
        },
      })
      .pipe(catchError(this.handleError));
  }

  getSingleProduct(productId: Number): Observable<ProductModelServer> {
    return this.http
      .get<ProductModelServer>(this.server_url + '/products/' + productId)
      .pipe(catchError(this.handleError));
  }

  //get products from one category
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.server_url + 'products/category/' + catName)
    .pipe(catchError(this.handleError))
  }


  //Get products categories and subcategories
  getAllCategories(): Observable<any> {
    return this.http
      .get(this.server_url + '/categories')
      .pipe(catchError(this.handleError));
  }

  //Get all food sub categories
  getAllFoodCategories(): Observable<any> {
    return this.http
      .get(this.server_url + '/category_food')
      .pipe(catchError(this.handleError));
  }

  //Get all drink sub categories
  getAllDrinkCategories(): Observable<any> {
    return this.http
      .get(this.server_url + '/category_drinks')
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
