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

  getSingleProduct(productId: Number): Observable<ProductModelServer> {
    return this.http
      .get<ProductModelServer>(this.server_url + '/products/' + productId)
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

  //Fetch products by restaurant
  getProductsByRestaurant(restaurantId: Number): Observable<any> {
    return this.http
      .get(this.server_url + '/productsByRest/' + restaurantId)
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

  //get products from one category
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http
      .get<ProductModelServer[]>(
        this.server_url + 'products/category/' + catName
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

  //

  //Get all products categories
  getAllCategories(): Observable<any> {
    return this.http.get(this.server_url + '/categories').pipe(
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

  //Get categories by ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get(this.server_url + '/categoryById' + id).pipe(
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

  //get products from one category
  getCategoryName(catName: string): Observable<ProductModelServer[]> {
    return this.http
      .get<ProductModelServer[]>(this.server_url + '/category/' + catName)
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
    return this.http.get(this.server_url + '/subcategories').pipe(
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

  //Get subcategories by id
  getSubCategoriesById(id: number): Observable<any> {
    return this.http.get(this.server_url + '/subcategories/' + id).pipe(
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

  //Get all food sub categories
  getAllFoodCategories(): Observable<any> {
    return this.http.get(this.server_url + '/category_food').pipe(
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

  //Get all drink sub categories
  getAllDrinkCategories(): Observable<any> {
    return this.http.get(this.server_url + '/category_drinks').pipe(
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
