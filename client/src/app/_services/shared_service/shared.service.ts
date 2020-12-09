import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userMessage = new BehaviorSubject({});
  sharedMessage = this.userMessage.asObservable();

  constructor() { }

  nextCustomerMessage(message: string) {
    this.userMessage.next(message)
  }
}
