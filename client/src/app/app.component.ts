import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './_auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  Title = 'Tosungana Food Ordering';

  sideBarOpen = true

  _route_url = "/home"

  constructor(private router:Router, public auth: AuthenticationService) { }

  ngOnInit() {

   
   
   }


  hasRoute(route: string){
    return this.router.url.includes(route)
  }
}
