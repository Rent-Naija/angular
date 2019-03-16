import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/authservice.service';
import { UserinfoService } from '../services/userinfo.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'RentNaija';
  userd;
  firstname;
  lastname;
  constructor( 
    public authservice: AuthService) { 
        this.authservice.navUser();
     //  this.firstname = localStorage.getItem('Ufirstname');
     // this.lastname = localStorage.getItem('Ulastname');
    }
   
  ngOnInit() {
    
  }

}
