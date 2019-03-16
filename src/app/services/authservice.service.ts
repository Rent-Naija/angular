import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable, OnInit } from '@angular/core';
import { Users } from '../interfaces/users';
import { Credentials } from '../interfaces/credentials';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  
@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit{
  //private _url = "http://rentnaija.ng/api";
  private _url = "http://rentapi.localhost/api";
  //private durl = "http://rentnaija.ng";
  private durl = "http://rentapi.localhost";
  formData: Users;
  headers: any;
  result;
  userinfo;
  userd;
  firstname;
  lastname;
  roleid;
  Uid;
  
  constructor(private router: Router,private http: HttpClient) { 
    this.headers = new HttpHeaders();
  }
 

  ngOnInit() {
   
  }

  newUser(formData: Users): Observable<Users>{
    return this.http.post<Users>(this._url + '/registeruser', formData, httpOptions);
  }

   login(username: string, password: string){
    let credentials = {
      username: username,
      password: password,
      client_id: '2',
      client_secret: "lGgZgikDhKVLMvkURO1SHTdTlFoop6x03XWh9Q1Z",
      grant_type: "password"
    }
    this.headers.append("content-Type", "application/json");

    return this.http.post(this.durl + '/oauth/token', 
      credentials,{headers: this.headers } )
      .pipe(map( response => {
        this.result = response;
        if(this.result && this.result.access_token){
          localStorage.setItem('access_token', this.result.access_token);
          return true;
        }
        return false;
      }
        ));
    
    }


  logout(){
      localStorage.removeItem('access_token');
      localStorage.removeItem('Ufirstname');
      localStorage.removeItem('Ulastname');
      localStorage.removeItem('Uemail');
      localStorage.removeItem('Uid');
      localStorage.removeItem('uphonenumber');
      localStorage.removeItem('uprofileimage');
      localStorage.removeItem('uroleid');
      this.router.navigate(['/']);
  }

  isLoggedIn(){
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('access_token');
   
    if(!token)
      return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  navUser(){
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = {
    headers: new HttpHeaders({"Authorization": k})
  };
    this.http.get(this._url + '/user', httpOptions1 ).subscribe(data => {
      this.userd = data; 
      this.firstname = this.userd.firstname;
      this.lastname = this.userd.lastname;
      this.roleid = this.userd.roleid;
      this.Uid = this.userd.id;
     });
  }

  signUser(){
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = {
    headers: new HttpHeaders({"Authorization": k})
  };
    return this.http.get(this._url + '/user', httpOptions1 );
  }
  
  updateUser( userid: number,
    firstname: string,
    lastname: string,
    roleid: string,
    email: string,
    phonenumber: string,
    password: string,
    profileimage?: File){
    const formData: FormData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('roleid', roleid);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    formData.append('password', password);
    if(profileimage != null)
    formData.append('profileimage',profileimage, profileimage.name);
    

    return this.http.post(this._url + '/updateuser/' + userid, formData);
  }


}
