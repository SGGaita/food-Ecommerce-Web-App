import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './_auth/authentication.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pageTitle = 'Maungano Food Express';

  sideBarOpen = true

  _route_url = "/home"
  userName: any;

  constructor(private router:Router, public auth: AuthenticationService, private title: Title) { }

  ngOnInit() {
 this.title.setTitle(this.pageTitle)

    //fetch user token and decode
    let customerToken = this.auth.getToken();
    console.log('User token', customerToken);
    var decoded = jwt_decode(customerToken);
    this.userName = decoded.username

    

   
   
   }


  hasRoute(route: string){
    return this.router.url.includes(route)
  }
}
