import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  invalidLogin =  false;
  result;
  response;
  userinfo;
  username;
  password;
  constructor(
    private titleService: Title,
      private router: Router,
      private route: ActivatedRoute,
      private authservice: AuthService) { 
        this.titleService.setTitle('Login to Your DashBoard | RentNaija');
        if(authservice.isLoggedIn()){
          this.router.navigate(['/admin']);
        }
      }

      signIn(form: NgForm){
        this.authservice.login(form.value.username, form.value.password)
          .subscribe(result => {
            this.response = result;
            if(this.response){
              let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              //store user info
              this.authservice.signUser()
              .subscribe(data => {
                this.userinfo = data;
                localStorage.setItem('Ufirstname', this.userinfo.firstname);
                localStorage.setItem('Ulastname', this.userinfo.lastname);
                localStorage.setItem('Uemail', this.userinfo.email);
                localStorage.setItem('Uid', this.userinfo.id);
                localStorage.setItem('uphonenumber', this.userinfo.phonenumber);
                localStorage.setItem('uprofileimage', this.userinfo.profileimage);
                localStorage.setItem('uroleid', this.userinfo.roleid);
              });
              
              this.router.navigate([returnUrl || '/admin']);
            }else{
              this.invalidLogin = false;
            }
          },(error => {
            this.invalidLogin = true;
             }) 
          );
        }

  

}
