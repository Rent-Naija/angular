import { Injectable } from '@angular/core';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  userinfo;
  firstname;
  lastname;
  email;
  id;
  phonenumber;
  profileimage;
  roleid;

  //get from local storage
  Ufirstname =   localStorage.getItem('Ufirstname');
  Ulastname =   localStorage.getItem('Ulastname');
  Uemail =   localStorage.getItem('Uemail');
  Uid =   localStorage.getItem('Uid');
  Uphonenumber =   localStorage.getItem('uphonenumber');
  Uprofileimage =   localStorage.getItem('uprofileimage');
  Uroleid =   localStorage.getItem('uroleid');

  //get from server
  constructor(private authservice: AuthService) { 
    this.authservice.signUser()
    .subscribe(data => {
      this.userinfo = data;
      this.firstname = this.userinfo.firstname;
      this.lastname = this.userinfo.lastname;
      this.email = this.userinfo.email;
      this.id = this.userinfo.id;
      this.phonenumber = this.userinfo.phonenumber;
      this.profileimage = this.userinfo.profileimage;
     return  this.userinfo.roleid;
    });
  }

  userdetails(){
    
  }


}
