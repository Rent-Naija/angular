import { Component, OnInit } from '@angular/core';
import { HostelService} from '../services/hostel.service';
import { Properties } from '../interfaces/properties';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/authservice.service';
import { Title } from '@angular/platform-browser';
import { Schools } from '../interfaces/schools';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
isLoadingResults = true;
  isschool = false;
  thisSearch = false;
  public hostels: any;
  filteredhostels: any;
 // subscription: Subscription;
 schoollist;
 subproperty;
 rooms;
 subproperties;

  constructor(
    private titleService: Title,
    private router: Router,
    private authservice: AuthService,
    private school: Schools,
    private _service: HostelService) {
      if(authservice.isLoggedIn()){
        this.router.navigate(['/hostel']);
      }
      this.titleService.setTitle('List of Hostels | RentNaija');
    this._service.getHostels()
    .subscribe(response => {
      this.filteredhostels = this.hostels = response.property
      if(this.filteredhostels != null){this.subproperties = response.subproperty};
   });
    this.isLoadingResults = false;
    this.schoollist = this.school.getSchools();
    
   }

   filter(school: string){
   this.thisSearch = true;
   this.isschool = true;
    this.filteredhostels = (school) ?
      this.hostels.filter( p => p.city.toLocaleLowerCase().includes(school.toLocaleLowerCase())) :
      this.hostels;
  }

  viewall(){
    this._service.getHostels()
    .subscribe(response => {
      this.filteredhostels = this.hostels = response.property
      this.subproperties = response.subproperty;
   });
  
  }
  


  ngOnInit() {
    
  }

  submit(school){
    this._service.searchHostels(school.value)
    .subscribe(response => {this.filteredhostels = this.hostels = response;
    });
  }
  
}
