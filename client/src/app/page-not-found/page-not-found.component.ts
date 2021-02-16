import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
pageTitle = "Page not Found | Maungano Food Express"

  constructor() { }

  ngOnInit(): void {
  }

}
