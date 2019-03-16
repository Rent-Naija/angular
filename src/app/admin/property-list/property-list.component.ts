import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostelService } from 'src/app/services/hostel.service';
import { Properties } from '../../interfaces/properties';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/authservice.service';
import { UserinfoService } from 'src/app/services/userinfo.service';

@Component({
  selector: 'admin-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  list: Properties[];
  filteredProperties: Properties[];
  subscription: Subscription;
  userid;
 userrole;
  userinfo;

  Uroleid ;
  constructor(
    private authservice: AuthService,
    private adminservice: AdminService,
    private hotelservice: HostelService) { 
      this.authservice.signUser()
    .subscribe(data => {
      this.userinfo = data;
      this.userid = this.userinfo.id
      this.userrole =  this.userinfo.roleid;
      this.propertylist();
    });
      
  }
  propertylist(){
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
    if(this.userrole === 6){
      this.hotelservice.propertylist()
      .subscribe(res => this.filteredProperties = this.list = res);
    }
  }
  filter(query: string){
    this.filteredProperties = (query) ?
      this.list.filter( p => p.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.list;
  }

  ngOnDestroy(){
  //  this.subscription.unsubscribe();

  }
  ngOnInit() {}

  populateForm(l: Properties){
    this.hotelservice.formData = Object.assign({}, l);
  }

  onDelete(id: number){
    if(confirm('Are You sure You want to Delete this record?')){
      this.adminservice.deleteProperty(id)
      .subscribe(res => {
        this.propertylist();
      });
    }
  }
  
  onApproval(id: any){
      this.adminservice.approveProperty(id)
      .subscribe(res => {
        this.propertylist();
      });
    }
 

}
