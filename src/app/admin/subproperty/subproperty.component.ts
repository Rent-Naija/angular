import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { Properties } from 'src/app/interfaces/properties';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-subproperty',
  templateUrl: './subproperty.component.html',
  styleUrls: ['./subproperty.component.css']
})
export class SubpropertyComponent implements OnInit {
  userid;
  list: Properties[];
  formsuccess = false;
  fileToUpload: File = null;
  filteredProperties: Properties[];
  
  userrole;
 
  userinfo;
  
  constructor(
    private authservice: AuthService,
    public adminservice: AdminService) { 
      this.authservice.signUser()
      .subscribe(data => {
        this.userinfo = data;
        this.userid = this.userinfo.id
        this.userrole =  this.userinfo.roleid;
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

  handleCoverPhoto(file: FileList){
    this.fileToUpload = file.item(0);
   }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();
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
   
    submitSub(propertyid,subname,price, room, toilet, garage, bathroom, coverphoto){

      this.adminservice.postsubProperty(
        propertyid.value,subname.value,price.value, room.value, toilet.value, garage.value, bathroom.value,
        this.fileToUpload)
         .subscribe( res => {
         
           //this.resetForm();
           this.formsuccess = true; });
           
   }
}
