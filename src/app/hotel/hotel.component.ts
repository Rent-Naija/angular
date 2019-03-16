import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostelService} from '../services/hostel.service';
import { Subscription } from 'rxjs';
import { Properties } from '../interfaces/properties';
import { Title }     from '@angular/platform-browser';
import { AuthService } from '../services/authservice.service';
import { forEach } from '@angular/router/src/utils/collection';
import { join } from 'path-browserify';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  public hotels: any;
  issearch = false;
  filteredhotels: any;
  subproperties;
  ok;
  id;
  sam;
  listId;
  imageUrl;
  constructor(
    private titleService: Title,
    private authservice: AuthService,
    private _service: HostelService) { 
      this.titleService.setTitle('List of Hotels | RentNaija');
    this._service.getHotels()
    .subscribe(response => {
        this.filteredhotels = this.hotels = response.property;
        this.imageUrl = 'http://rentapi.localhost/storage/cover_Images/';
        
        if(response.property != null){this.subproperties = response.subproperty};
    });
  
   
  }

  filters(state: string){
    this.issearch = true;
     this.filteredhotels = (state) ?
       this.hotels.filter( p => p.state.toLocaleLowerCase().includes(state.toLocaleLowerCase())) :
       this.hotels;
   }

     viewall(){
    this._service.getHostels()
    .subscribe(response => {
        this.filteredhotels = this.hotels = response.property;
        if(response.property != null){this.subproperties = response.subproperty};
       });
  
  }

   filterc(city: string){
    this.issearch = true;
     this.filteredhotels = (city) ?
       this.hotels.filter( p => p.city.toLocaleLowerCase().includes(city.toLocaleLowerCase())) :
       this.hotels;
   }
 
   filterp(price: string){
     this.issearch = true;
     this.filteredhotels = (price) ?
       this.hotels.filter( p => p.price.toLocaleLowerCase().includes(price.toLocaleLowerCase())) :
       this.hotels;
   }
  
  ngOnInit() {
    
  }

  submit(state,city,price){
    this._service.searchHotels(state.value, city.value, price.value)
    .subscribe(response => this.filteredhotels = this.hotels = response);
  }
 

}
