import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'RNsidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roleid;
  
  constructor(public authservice: AuthService) { 
    this.authservice.navUser(); 
   //this.roleid = localStorage.getItem('uroleid');
  }

  ngOnInit() {
  }

}
