import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HostelService} from '../services/hostel.service';
import { AuthService } from '../services/authservice.service';
import { UserinfoService } from '../services/userinfo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  property;
  propertyinfo;
  propertyImg: any;
  subpropertieslist;
  favourites;
  selectedid: any;
  viewid;
  selectedtype: any;
  ownerid;
  sagentid;
  like;
  displayicon = true;
  //subpropertyinfo
  availablesubp;
  rooms;
  toilets;
  garages;
  bathrooms;
  moreinfo;
  subUrl;
  

  constructor(
    private titleService: Title,
    private route: ActivatedRoute, 
    private _router: Router, 
    private userinfo: UserinfoService,
    private authservice: AuthService,
    private _service: HostelService) {
      this.subUrl = 'http://rentapi.localhost/storage/coverimages/';
    this.route.paramMap
    .subscribe(params => {
      //this.selectedid = +params.get('propertyid');
      this.viewid = params.get('propertyid');
      this.selectedtype = params.get('propertytype');
    });
    this._service.getViewid(this.viewid)
      .subscribe(response => {
        this.selectedid = response.id;
     
    let id = this.selectedid;
    let type = this.selectedtype;

    this.getproperties(); 
    
    this.allfav();
    this.checkfavourite(); 
   this.subpropertyinfo();
   this.subproperties();
  });
    
   }
 

  ngOnInit() {}

   getproperties(){
    let id = this.selectedid;
    let type = this.selectedtype;
    this._service.getproperties(type,id)
    .subscribe(response => {
      this.property = response.property;
      this.moreinfo = response.propertyinfo;
      this.propertyImg = response.propertyimages;
      this.ownerid = this.property.ownerid;
      this.sagentid = this.property.sagentid;
      this.titleService.setTitle(this.property[0].name + ' - ' + this.property[0].address + ' | RentNaija');
        });
  }

  allfav(){
    let id = this.selectedid;
    this._service.getfavourites(id)
    .subscribe(response => {
      this.favourites = response.likeTotal;
    });
   }

  checkfavourite(){
    let id = this.selectedid;
    this._service.checkfavourite(id,this.userinfo.id)
      .subscribe(response => {
        this.like = response;
      });

  }

  subpropertyinfo(){
    let id = this.selectedid;
    this._service.getpropertyinfo(id)
      .subscribe(response => {
        this.availablesubp = response.availablesubp;
        this.rooms = response.rooms;
        this.toilets = response.toilets;
        this.garages = response.garages;
        this.bathrooms = response.bathrooms;
      });
  }

 subproperties(){
  let id = this.selectedid;
   this._service.subProperties(id).subscribe(
     response => {
       this.subpropertieslist = response.subproperty;
     })
 }

  addlike(){
    //wait or no wait
      
    this._service.addfavourite(this.selectedid, this.userinfo.Uid)
      .subscribe(response => {
        this.allfav();
        this.displayicon = false;
      });
  }

  unlike(){
        
    this._service.addfavourite(this.selectedid, this.userinfo.Uid)
      .subscribe(response => {
        this.allfav();
        this.displayicon = true;
      });
  }

}
