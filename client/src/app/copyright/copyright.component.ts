import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {

  date = new Date()
  _year: number;

  constructor() { }

  ngOnInit(): void {
    this._year = this.date.getFullYear()
  }

}
