import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/authservice.service';
import { HostelService } from 'src/app/services/hostel.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  selectedid: any;
  userid;
  clickedproperty;
  userdata;
  useremail;
  email;
  
  paymentsuccess = false;
  refernce = Math.round(Math.random() * 1000000000000);
 formData: FormData = new FormData();
  constructor(
    private route: ActivatedRoute, 
    private _router: Router, 
    private authservice: AuthService,
    private userinfo: UserinfoService,
    private adminservice: AdminService,
    private _service: HostelService) { 
      this.route.paramMap
        .subscribe(params => {
        this.selectedid = +params.get('propertyid');
        this.adminservice.getproperty(this.selectedid)
            .subscribe(response => { 
              this.clickedproperty = response.property;
            console.log(response); });
      });
            this.authservice.signUser()
          .subscribe(data => {
            this.userdata = data;
            this.userid = this.userinfo.id;
            this.useremail = this.userinfo.email;
            let str = new String(this.useremail);
            this.email = str.toString();
          });
   
          
    }

  ngOnInit() {
  }

  newBook(){
    this.adminservice.newt(this.selectedid,this.userid)
        .subscribe(res => {
      console.log(res);
      this.paymentsuccess = true;
    });
    
  }


  paymentDone($event){
    console.log($event);
    if($event.response === 'Approved'){
      this.paymentsuccess = true;
     this.adminservice.newp(this.selectedid,this.userid,$event.response, $event.trans, $event.trxref)
     .subscribe(res => {
       console.log(res);
     });
        this.adminservice.newt(this.selectedid,this.userid)
        .subscribe(res => {
          console.log(res);
        });
    }
    else{
      console.log($event.response);
      console.log($event.message);
    };
  }

  paymentCancel(){
    console.log("cancel");
  }

}
