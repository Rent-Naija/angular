import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'RNmainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit {
  cyear = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
  
  }

}
