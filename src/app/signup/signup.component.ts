import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  invalidLogin =  false;
  message;
  success;
  Acctype = [
    {id: 1, name: 'Occupant'},
    {id: 2, name: 'LandLord'},
    {id: 3, name: 'House Agent'},
    {id: 4, name: 'Field Agent'},
  ];

  constructor(
    private titleService: Title,
    private router: Router,
      private route: ActivatedRoute,
    public authservice: AuthService) {
      
        if(authservice.isLoggedIn()){
          this.router.navigate(['/admin']);
        }
        this.titleService.setTitle('Signup as an Occupant / Landlord / Agent| RentNaija');
  }

  ngOnInit() {
    this.resetform();
  }

  resetform(form? : NgForm){
    if(form != null)
    form.resetForm();
    this.authservice.formData = {
      id: null,
      firstname: '',
      lastname: '',
      roleid: '',
      email: '',
      phonenumber: '',
      profileimage: null,
      password: ''
    }
  }

  onsubmit(form: NgForm){
    this.insertRecord(form);
  }

  insertRecord(form: NgForm){
    this.authservice.newUser(form.value)
    .subscribe(res => {
      this.success = true;
      this.resetform(form) 
    },(error =>{
      this.invalidLogin = true;
      
      }) 
    );
  }
  
}
