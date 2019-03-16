import { Component, OnInit } from '@angular/core';
import { HostelService} from '../services/hostel.service';
import { Properties } from '../interfaces/properties';
import { AuthService } from '../services/authservice.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  public rents: any;
  issearch = false;
  filteredrents: any;
  subproperty;
   subproperties;

  constructor(
    private titleService: Title,
    private authservice: AuthService,
    private _service: HostelService) { 
      this.titleService.setTitle('List of Rents | RentNaija');
    this._service.getrents()
    .subscribe(response => {
      this.filteredrents = this.rents = response.property
      if(response.property != null){this.subproperties = response.subproperty};
    });
  
  
  }

  filters(state: string){
    this.issearch = true;
     this.filteredrents = (state) ?
       this.rents.filter( p => p.state.toLocaleLowerCase().includes(state.toLocaleLowerCase())) :
       this.rents;
   }

    viewall(){
    this._service.getHostels()
    .subscribe(response => {
      this.filteredrents = this.rents = response.property
      if(response.property != null){this.subproperties = response.subproperty};
       });
  
  }

   filterc(city: string){
    this.issearch = true;
     this.filteredrents = (city) ?
       this.rents.filter( p => p.city.toLocaleLowerCase().includes(city.toLocaleLowerCase())) :
       this.rents;
   }
 
   filterp(price: string){
     this.issearch = true;
     this.filteredrents = (price) ?
       this.rents.filter( p => p.price.toLocaleLowerCase().includes(price.toLocaleLowerCase())) :
       this.rents;
   }

  ngOnInit() {
    
  }

  submit(state,city,price){
    this._service.searchHotels(state.value, city.value, price.value)
    .subscribe(response => this.filteredrents = this.rents= response);
  }
  
}
