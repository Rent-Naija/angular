import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { BankDetails } from 'src/app/interfaces/bankDetails';
import { UserinfoService } from 'src/app/services/userinfo.service';
import { AuthService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-mybank',
  templateUrl: './mybank.component.html',
  styleUrls: ['./mybank.component.css']
})
export class MybankComponent implements OnInit {
  formsuccess = false;
  bankd : BankDetails;
  userid;
  bankinfo;

  constructor(
    private authservice: AuthService,
    private userinfo: UserinfoService,
    public adminservice: AdminService) {
      this.userid = this.userinfo.Uid;

    
   }

  ngOnInit() {
    this.resetForm();
    this.getbankd();
  }

  getbankd(){
    
       this.adminservice.getBankd(this.userid)
          .subscribe(response => { this.bankinfo = response; });
  
    
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();
      this.adminservice.bankd = {
        id: null,
        userid: this.userid,
        bankname: '',
        acctno: '',
        acctname: ''
      }
    }
  
    onSubmit(form){
      if(form.value.id == null)
      this.insertRecord(form);
    }
  
    insertRecord(form : NgForm){
      console.log(form.value);
     
      this.adminservice.newBankd(form.value)
      .subscribe(res =>{
        //this.resetForm(form);
        this.getbankd();
        this.formsuccess = true;
      });
    }

    populateForm(l: BankDetails){
      this.adminservice.bankd = Object.assign({}, l);
    }
}
