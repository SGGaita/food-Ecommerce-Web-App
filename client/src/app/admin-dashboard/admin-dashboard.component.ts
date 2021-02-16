import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pageTitle = "Dashboard | Maungano Food Express"

  constructor(private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle)
  }

}
