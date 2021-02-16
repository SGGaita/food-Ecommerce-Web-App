import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  refresh(){
    this.ngOnInit()
  }

}
