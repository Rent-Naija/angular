import { Component, OnInit } from '@angular/core';
import { HostelService } from 'src/app/services/hostel.service';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Properties } from 'src/app/interfaces/properties';
import { PropertiesImg } from 'src/app/interfaces/propertiesImg';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'admin-addimages',
  templateUrl: './addimages.component.html',
  styleUrls: ['./addimages.component.css'],
  providers: [AdminService]
})
export class AddimagesComponent implements OnInit {
  propertyid;
  selectedFile: File = null;
  imgurl : string;
  fileToUpload: File = null;
  list: Properties[];
  filteredProperties: Properties[];
  imglist: PropertiesImg[];
  formsuccess = false;
  userid;
  userrole;
 
  userinfo;

  constructor(
    private authservice: AuthService,
    public adminservice: AdminService,
    public _service: HostelService) {
      this.authservice.signUser()
      .subscribe(data => {
        this.userinfo = data;
        this.userid = this.userinfo.id
        this.userrole =  this.userinfo.roleid;
        console.log(this.userid);
          if(this.userrole === 2){
            this.adminservice.ownerpropertylist(this.userid)
            .subscribe(res => this.filteredProperties = this.list = res);
          }
          
          if(this.userrole === 3){
            this.adminservice.sagentpropertylist(this.userid)
            .subscribe(res => this.filteredProperties = this.list = res);
          }
  
          if(this.userrole === 4){
            this.adminservice.sagentpropertylist(this.userid)
            .subscribe(res => this.filteredProperties = this.list = res);
          }
      });
     }

  ngOnInit() {
    this.resetForm();
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
  }

  onSubmits(propertyid,imgurl,type,height,width,length){
    console.log(propertyid.value);
    console.log(this.fileToUpload);
    console.log(type.value);
    console.log(height.value);
    console.log(width.value);
    console.log(length.value);
    this.adminservice.postImg(
      propertyid.value,
      this.fileToUpload,
      type.value,
      height.value,
      width.value,
      length.value
    ).subscribe(
      res => {
        console.log(res);
        this.resetForm();
        this.formsuccess = true;
      }
    );

    }

  resetForm(form?: NgForm){
  if (form != null)
    form.resetForm();
    this.adminservice.imgData = {
      id: null,
      propertyid: '',
      imgurl: null,
      type: '',
      height: '',
      width: '',
      length: ''
    }
    this._service.formData = {
      id: null,
      ownerid: null,
      sagent: null,
      name: null,
      price: null,
      type: null,
      state: null,
      city: null,
      coverphoto: null,
      address: null,
      description: null
    }
  }


 

  updateRecord(form : NgForm){
    this.adminservice.updatePropertyImg(form.value.id, form.value)
    .subscribe(res =>{
      this.resetForm(form);
      this._service.propertylist();
    });
  }

}
