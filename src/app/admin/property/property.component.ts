import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HostelService } from 'src/app/services/hostel.service';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Properties } from 'src/app/interfaces/properties';
import { Schools } from '../../interfaces/schools';

@Component({
  selector: 'admin-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class APropertyComponent implements OnInit {
  selectedid: any;
  formsuccess = false;
  formupdate = false;
  subformsuccess = false;
  imgurl : string;
  fileToUpload: File = null;
  newp;
  propertyid;
  disabled = false;
  schoollist;
  //form steps
  step1 = true;
  step2 = false;
  step3 = false;
 
  //properties info
    gownerid;
    gsagent;
    gname;
    gprice;
    gstate;
    gcity;
    gcoverphoto;
    gaddress;
    gdescription;

  Type = [
    {id: 1, name: 'Hostel'},
    {id: 2, name: 'Hotel'},
    {id: 3, name: 'Rent'},
  ];

  Value = [
    {id: 0, name: 'No'},
    {id: 1, name: 'Yes'}
  ];

  constructor(
    private route: ActivatedRoute, 
    private _router: Router, 
    private school: Schools,
    private adminservice: AdminService) { 
      this.route.paramMap
      .subscribe(params => {
      this.selectedid = +params.get('propertyid');
    });
    this.schoollist = this.school.getSchools();
    }

  ngOnInit() {
    this.resetForm();
    this.getpropertydetails();
  }
  
  getpropertydetails(){
  /*  let id = this.selectedid;
    this.adminservice.getproperty(id)
      .subscribe(response => {
        this.adminservice.pData.name = response.name;
        this.adminservice.pData.ownerid = response.ownerid;
        this.adminservice.pData.sagent = response.sagentid;
        this.adminservice.pData.price = response.price;
        this.adminservice.pData.type = response.type;
        this.adminservice.pData.state = response.state;
        this.adminservice.pData.city = response.city;
        this.adminservice.pData.address = response.address;
        this.adminservice.pData.description = response.description;
        }); */
  }

  handleCoverPhoto(file: FileList){
   this.fileToUpload = file.item(0);
  }

  onSubmits(propertyid,name,ownerid,sagent,coverphoto,type,price,state,city,address,description){
    this.disabled = true;
      this.adminservice.postProperty(
        propertyid.value,ownerid.value,name.value,price.value,type.value,state.value,city.value,this.fileToUpload,
         address.value,description.value,sagent.value)
         .subscribe( res => {
           this.step1 = false;
           this.step2 = true;
           //console.log(res.property.id);
           let j = res.property;
           this.newp = res.property.id;
           this.resetForm();
           this.formsuccess = true; });
   }

  resetForm(form?: NgForm){
  if (form != null)
    form.resetForm();
    this.adminservice.pData = {
      id: null,
      ownerid: '',
      sagent: '',
      name: '',
      price: '',
      type: '',
      state: '',
      city: '',
      coverphoto: null,
      address: '',
      description: ''
    }
    this.adminservice.subpData = {
      propertyid: '', 
      name: '', 
      price: '',
      room: '', 
      toilet: '', 
      garage: '', 
      bathroom: '', 
    coverphoto: null
    }

  }

  submitinfo(form : NgForm){
    console.log(form.value);
     this.adminservice.newpropertyinfo(form.value)
     .subscribe(res =>{
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
      this.formsuccess = true;
    });
  }

  submitSub(propertyid,subname,price, room, toilet, garage, bathroom, coverphoto){

    this.adminservice.postsubProperty(
      propertyid.value,subname.value,price.value, room.value, toilet.value, garage.value, bathroom.value,
      this.fileToUpload)
       .subscribe( res => {
         this.step1 = false;
         this.step2 = false;
         this.subformsuccess = true;
         //this.resetForm();
         this.formsuccess = true; });
         
 }
  resetSub(){
    this.adminservice.subpData = {
      propertyid: this.newp, 
      name: '', 
      price: '',
      room: '', 
      toilet: '', 
      garage: '', 
      bathroom: '', 
    coverphoto: null
    }
   
  }

  

}
