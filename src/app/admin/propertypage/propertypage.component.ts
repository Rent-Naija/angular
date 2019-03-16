import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PropertiesImg } from 'src/app/interfaces/propertiesImg';
import { Properties } from 'src/app/interfaces/properties';
import { Users } from 'src/app/interfaces/users';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-propertypage',
  templateUrl: './propertypage.component.html',
  styleUrls: ['./propertypage.component.css']
})
export class PropertypageComponent implements OnInit {
  selectedid: any;
  property: Properties;
  imglist;
  ptenants;
  pcomplains;
  propertyinfo;
  newsubp = false;
    
  addimage = false;
  allsubproperties;
  ticketdetail;
  ticketcomment;
  title: '';
    imageurl = "http://rentapi.localhost/storage/cover_images/";
    allusers: Users[];
     //subpropertyinfo
  availablesubp;
  rooms;
  toilets;
  garages;
  bathrooms;
subUrl;
propertyUrl;
  Category = [
    {id: 1, name: 'Techical'},
    {id: 2, name: 'Support'},
    {id: 3, name: 'Sales'},
    {id: 4, name: 'Sugestion'},
    {id: 5, name: 'complaint'},
  ];


  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute, 
    private _router: Router, 
    private adminservice: AdminService) { 
      this.propertyUrl = 'http://rentapi.localhost/storage/cover_Images/';
      this.subUrl = 'http://rentapi.localhost/storage/coverimages/';
      this.route.paramMap
        .subscribe(params => {
        this.selectedid = +params.get('propertyid');
      });
      this.authservice.navUser();
      }

  ngOnInit() {
    this.rnusers();
      this.adminproperty();  
      this.allSub();
  }

  rnusers(){
    this.adminservice.allusers()
        .subscribe(response => {  this.allusers = response });
  }

  adminproperty(){
    let propertyid = this.selectedid;
    this.adminservice.getproperty(propertyid)
      .subscribe(response => {
        this.property = response.property;
        this.imglist = response.propertyimages;
        this.ptenants = response.propertytenants;
        this.pcomplains = response.propertyticket; 
        this.propertyinfo = response.propertyinfo;
          });
  }

  //get all sub properties according to id
  allSub(){
    this.adminservice.allsubproperty(this.selectedid)
      .subscribe(subproperty => {
        this.allsubproperties = subproperty.subproperty;
        console.log(subproperty);
      });
  }
  //delete sub property
  deleteSubProperty(id){
    this.adminservice.deletesubproperty(id)
      .subscribe(res => {  this.allSub(); });
  }

  //delete propertyimg
  onDelete(id){
    if(confirm('Are You sure You want to Delete this record?')){
      this.adminservice.deletePropertyImg(id)
      .subscribe(res => { console.log(res); });
    }
  }

  newimage(){ this.addimage = true; }
  doneimage(){ this.addimage = false; this.adminproperty(); }

  newsub(){
    this.newsubp = true;
  }
  oddsub(){this.newsubp = false; this.adminproperty(); }
    getcthread(form : NgForm){
      this.adminservice.getcomplainthread(form.value)
      .subscribe(res =>{
        this.ticketdetail = res.ticket;
        this.ticketcomment = res.comments;
      });
    }

    newComment(form : NgForm){
      this.adminservice.newcomplaincomment(form.value)
      .subscribe(res =>{
        this.getcthread(form);
      });
    }

}
