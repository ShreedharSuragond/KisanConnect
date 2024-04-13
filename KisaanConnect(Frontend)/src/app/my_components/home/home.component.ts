import { Component, OnInit } from '@angular/core';
import { Input, Dropdown, Collapse, initMDB } from 'mdb-ui-kit';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initMDB({ Input, Dropdown, Collapse });
  }

}
