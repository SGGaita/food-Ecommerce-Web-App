import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  pageTitle = "User Accounts | Maungano Food Express"
  users: any;

  constructor(private title: Title, private userService: UserService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)

    //fetch user accounts
    this.spinner.show()
    this.userService.getUsers()
    .subscribe(data=>{
      this.users = data.users
      this.spinner.hide()
    })
  }

  refresh(){
    this.ngOnInit()
  }

}
