import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../services/authservice.service';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 imgurl : string;
 fileToUpload: File = null;
 Uroleid;

 //data
 userinfo;
 firstname;
 lastname;
 email;
 id;
 phonenumber;
 profileimage;
 roleid;
 imageUrl;

 Acctype = [
  {id: 1, name: 'Occupant'},
  {id: 2, name: 'Landlord'},
  {id: 3, name: 'Super Agent'},
  {id: 4, name: 'Agent'},
];

  editing = false;
  efirstname = '';
  elastname = '';
  ephonenumber = '';
  eemail = '';
  epassword = '';
  eroleid = '';
  euserid = '';

  constructor(
    private authservice: AuthService) {
      this.authservice.signUser().subscribe(data => {
        this.imageUrl = 'http://rentapi.localhost/storage/Profile_images/';
        this.userinfo = data;
        this.firstname = this.userinfo.firstname;
        this.lastname = this.userinfo.lastname;
        this.email = this.userinfo.email;
        this.id = this.userinfo.id;
        this.phonenumber = this.userinfo.phonenumber;
        this.profileimage = this.userinfo.profileimage;
        this.roleid = this.userinfo.roleid;
      }); 
    /*  this.firstname = localStorage.getItem('Ufirstname');
        this.lastname = localStorage.getItem('Ulastname');
        this.email = localStorage.getItem('Uemail');
        this.id = localStorage.getItem('Uid');
        this.phonenumber = localStorage.getItem('uphonenumber');
        this.profileimage = localStorage.getItem('uprofileimage');
        this.roleid = localStorage.getItem('uroleid'); */
   }
   handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
  }

   onEdit(){
     this.editing = true;
     this.efirstname = this.userinfo.firstname;
     this.elastname = this.userinfo.lastname;
     this.ephonenumber = this.userinfo.phonenumber;
     this.eemail = this.userinfo.email;
     this.eroleid = this.userinfo.roleid;
     this.euserid = this.userinfo.id;
   }
   onCancel(){
    this.editing = false;
   }
  
   onSubmit(efirstname,elastname,ephonenumber,eprofileimage,eemail,epassword,eroleid,euserid){
      this.authservice.updateUser(
      euserid,efirstname,elastname,eroleid,eemail,ephonenumber,epassword,this.fileToUpload,
    ).subscribe(
      res => {
        console.log(res);
        this.editing = false;
        localStorage.setItem('Ufirstname', efirstname);
        localStorage.setItem('Ulastname', elastname);
         localStorage.setItem('Uemail', eemail);
        localStorage.setItem('uphonenumber', epassword);
       // localStorage.setItem('uprofileimage', this.userinfo.profileimage);
      }
    );
   }
  
   
}
