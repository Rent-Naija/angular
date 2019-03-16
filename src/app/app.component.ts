import { Component } from '@angular/core';
import { AuthService } from './services/authservice.service';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentNaija';
  constructor(
    public authservice: AuthService) { 
    }
}
