import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userData = new BehaviorSubject([]);
  sharedUser = this.userData.asObservable();

  constructor() { }

  nextUserData(user: []) {
    this.userData.next(user)
  }
}
