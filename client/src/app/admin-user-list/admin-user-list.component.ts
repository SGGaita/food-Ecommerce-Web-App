import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  pageTitle = "User Accounts | Maungano Food Express"

  constructor(private title: Title, private userService: UserService) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)
  }

  refresh(){
    this.ngOnInit()
  }

}
