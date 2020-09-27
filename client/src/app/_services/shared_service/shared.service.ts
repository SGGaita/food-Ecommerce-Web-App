import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userData = new BehaviorSubject({});
  sharedCustomer = this.userData.asObservable();

  constructor() { }

  nextCustomerData(user: {}) {
    this.userData.next(user)
  }
}
