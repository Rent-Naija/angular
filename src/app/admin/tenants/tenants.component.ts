import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authservice.service';
import { AdminService } from 'src/app/services/admin.service';
import { Users } from 'src/app/interfaces/users';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  userrole: any;
  iftenant;
  tenantid;
  tpropertyid;
  tjoin;
  checklength;

    todayDate;
    try;
    lk;
    test;

  userinfo;

  //properties info
  ownerid;
  sagentid;
  allusers: Users[];

  constructor(
    private authservice: AuthService,
    private adminservice: AdminService) {
      this.authservice.signUser().subscribe(data => {
        this.userinfo = data;
        if(this.userinfo){
          this.tenantinfo();
        }
        
      });
  
    }

  ngOnInit() {
    this.rnusers();
  }

  tenantinfo(){
    this.adminservice.amTenant(this.userinfo.id)
        .subscribe(amt => { 
          this.iftenant = amt;
          this.tenantid = amt.userid;
          this.tpropertyid = amt.propertyid;
          const one_day = 1000 * 60 * 60 * 24;
          this.tjoin = new Date(amt.created_at); //date tenant join
          this.todayDate = new Date();
          console.log(this.todayDate);
          this.lk = Math.ceil((this.tjoin.getTime() - this.todayDate.getTime())/(one_day));
          console.log(this.lk); //store in variable and compare with positive
          this.test = this.lk;
          this.try = Math.abs(this.lk) ;

        
        /*console.log(new Date(this.tjoin.setYear(this.tjoin.getYear() + 1)));
          this.todayDate = new Date();
          this.lk = new Date(this.todayDate - this.tjoin);
          console.log(this.lk);
          this.try = 365 - this.lk.getDate(); */
          if(amt){
            this.propertyinfo();
          }
          
        });
      }

  propertyinfo(){
    let id = this.tpropertyid;
    this.adminservice.getproperty(id)
      .subscribe(response => {
        this.ownerid = response.ownerid;
          });
    }
   
  rnusers(){
    this.adminservice.allusers()
        .subscribe(response => {
            this.allusers = response
          });
  }

  }

