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

  // retrieving products
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

  
  //Fetch products by restaurant
  getProductsByRestaurant(
    restaurantId: Number
  ): Observable<any> {
    return this.http
      .get(
        this.server_url + '/productsByRest/' + restaurantId
      )
      .pipe(catchError(this.handleError));
  }

  //get products from one category
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http
      .get<ProductModelServer[]>(
        this.server_url + 'products/category/' + catName
      )
      .pipe(catchError(this.handleError));
  }

  //

  //Get all products categories
  getAllCategories(): Observable<any> {
    return this.http
      .get(this.server_url + '/categories')
      .pipe(catchError(this.handleError));
  }

  //Get categories by ID
  getCategoryById(id: number): Observable<any> {
    return this.http
      .get(this.server_url + '/categoryById' + id)
      .pipe(catchError(this.handleError));
  }

  //get products from one category
  getCategoryName(catName: string): Observable<ProductModelServer[]> {
    return this.http
      .get<ProductModelServer[]>(this.server_url + '/category/' + catName)
      .pipe(catchError(this.handleError));
  }

  //add new category
  addNewCategory(newCat: any): Observable<any> {
    return this.http.post(this.server_url + '/category', newCat);
  }

  //add new sub category
  addNewSubCategory(newSubCat: any): Observable<any> {
    return this.http.post(this.server_url + '/sub_category', newSubCat);
  }

  //Get  all sub categories
  getAllSubCategories(): Observable<any> {
    return this.http
      .get(this.server_url + '/subcategories')
      .pipe(catchError(this.handleError));
  }

  //Get subcategories by id
  getSubCategoriesById(id: number): Observable<any> {
    return this.http
      .get(this.server_url + '/subcategories/' + id)
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
