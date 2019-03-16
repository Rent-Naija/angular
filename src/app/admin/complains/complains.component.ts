import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { Complains } from 'src/app/interfaces/complains';
import { AuthService } from 'src/app/services/authservice.service';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.css']
})
export class ComplainsComponent implements OnInit {
  userid;
  ticketdetail;
  ticketcomment;
  userc: Complains[];
  formsuccess = false;
  formsuccex = false;
  complain : Complains;
  status = 'open';
  
  write = true;
  complaincontent = false;

  Category = [
    {id: 1, name: 'Techical'},
    {id: 2, name: 'Support'},
    {id: 3, name: 'Sales'},
    {id: 4, name: 'Sugestion'},
    {id: 5, name: 'complaint'},
  ];

  Priority = [
    {id: 1, name: 'Low'},
    {id: 2, name: 'Medium'},
    {id: 3, name: 'High'}
  ];

  constructor(
    private userinfo: UserinfoService,
    private authservice: AuthService,
    private _service: AdminService) {
        this.userid = this.userinfo.Uid;
        console.log(this.userid);
        
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();
      this._service.complain = {
        id: null,
        userid: this.userid,
        status: this.status,
        propertyid: '',
        title: '',
        category_id: '',
        priority: '',
        message: ''
      }
    }

    writec(){
      this.write = true;
      this.complaincontent = false;
    }
  
    onSubmit(form){
      if(form.value.id == null)
      this.insertRecord(form);
    }
    getcomplains(form : NgForm){
      this._service.getusercomplain(form.value)
      .subscribe(res =>{
        this.userc = res.tickets;
        //console.log(res);
      });
    }

    insertRecord(form : NgForm){
      this._service.newusercomplain(form.value)
      .subscribe(res =>{
        this.resetForm(form);
        console.log(res);
        this.formsuccess = true;
      });
    }

  

    getcthread(form : NgForm){
      console.log(form.value);
      this._service.getcomplainthread(form.value)
      .subscribe(res =>{
        this.ticketdetail = res.ticket;
        this.ticketcomment = res.comments;
        console.log(res.comments);
        //console.log(res);
        this.write = false;
        this.complaincontent = true;
      });
    } 
    
    newComment(form : NgForm){
      console.log(form.value)
      this._service.newcomplaincomment(form.value)
      .subscribe(res =>{
        
       this.getcthread(form);
        console.log(res);
        this.formsuccex = true;
      });
    }


}
