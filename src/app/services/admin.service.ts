import { Injectable } from '@angular/core';
import { BankDetails } from '../interfaces/bankDetails';
import { Complains } from '../interfaces/complains';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { PropertiesImg } from '../interfaces/propertiesImg';
import { Properties } from '../interfaces/properties';
import { AuthService } from './authservice.service';
import { Tenants } from '../interfaces/tenants';
import { Users } from '../interfaces/users';
import { PropertiesInfo } from '../interfaces/propertyInfo';
import { SubProperties } from '../interfaces/subproperty';
import { Payments } from '../interfaces/payments';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  let token = localStorage.getItem('access_token');
  let k = "Bearer " + token;
  
const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _url = "http://rentapi.localhost/api";
  bankd : BankDetails;
  complain : Complains;
  imgData: PropertiesImg;
  pData : Properties;
  subpData : SubProperties;

  constructor(
    private authservice: AuthService,
    private http: HttpClient) {
      
     }
    
   
  ownerpropertylist(id: string): Observable<Properties[]>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.get<Properties[]>(this._url + '/admin/property/owner/' + id, httpOptions1);
  }

  sagentpropertylist(id: string): Observable<Properties[]>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.get<Properties[]>(this._url + '/admin/property/owner/' + id, httpOptions1);
  }

  getproperty(propertyid: number): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.get<any>(this._url + '/admin/property/find/' + propertyid, httpOptions1);
  }

  allsubproperty(id: string): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.get<any>(this._url + '/admin/property/sub/' + id, httpOptions1);
  }

  deletesubproperty(id: string): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.delete<any>(this._url + '/admin/property/sub/remove/' + id, httpOptions1);
  }

 

  

  allusers(): Observable<Users[]>{
    return this.http.get<Users[]>(this._url + '/allusers');
  }

  amTenant(userid: number): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.get<any>(this._url + '/admin/property/checktenant/'  + userid, httpOptions1);
  }

  getBankd(userid: string): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.get<any>(this._url + '/admin/bankd/'  + userid, httpOptions1);
  }

  newBankd(bankd : BankDetails): Observable<BankDetails>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<BankDetails>(this._url + '/admin/addbankd', bankd, httpOptions1);
  }

  newusercomplain(complain : Complains): Observable<Complains>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<Complains>(this._url + '/createticket', complain, httpOptions1 );
  } 

  getusercomplain(userid: number): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
   
    return this.http.post<any>(this._url + '/viewallusertickets', userid, httpOptions1 );
  } 

  getcomplainthread(ticket_id: number): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/ticketsthread', ticket_id, httpOptions1 );
  } 


  newcomplaincomment(comment : Comment): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/postcomment', comment, httpOptions1 );
  } 

  newpropertyinfo(propertyinfo : PropertiesInfo): Observable<any>{
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/addpropertyinfo', propertyinfo, httpOptions1 );
  } 

  newt(propertyid: string,userid: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('propertyid', propertyid);
    formData.append('userid', userid);
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/addtenants', formData, httpOptions1 );
  } 

  newp(propertyid: string,userid: string,approval: string,RNtrans: string,PStrxref: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('propertyid', propertyid);
    formData.append('userid', userid);
    formData.append('approval', approval);
    formData.append('RNtrans', RNtrans);
    formData.append('PStrxref', PStrxref);
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/addpayment', formData, httpOptions1 );
  } 

  oldt(propertyid: string,userid: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('propertyid', propertyid);
    formData.append('userid', userid);
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/tenants/odd', formData, httpOptions1 );
  } 

  postProperty(propertyid:string,ownerid: string, name: string, price: string, type: string, state: string,
    city: string, coverphoto: File, address: string, description: string, sagent: string ): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('propertyid', propertyid);
    formData.append('ownerid', ownerid);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('coverphoto',coverphoto, coverphoto.name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('sagentid', sagent);
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/property/add', formData, httpOptions1);
  }

  deleteProperty(propertyid: any){
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.delete(this._url + '/admin/property/remove/' + propertyid, httpOptions1);
  }

  approveProperty(propertyid: any){
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.put(this._url + '/admin/property/approval/' + propertyid, httpOptions1);
  }

  postsubProperty(propertyid:string, name: string,price: string, room: string, toilet: string, garage: string, 
    bathroom: string, coverphoto: File ): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('propertyid', propertyid);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('room', room);
    formData.append('toilet', toilet);
    formData.append('garage', garage);
    formData.append('bathroom', bathroom);
    formData.append('coverphoto',coverphoto, coverphoto.name);
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/property/sub/add', formData, httpOptions1);
  }

  postImg(propertyid: string, imgurl: File, type: string,
    height: string, width: string, length: string ): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('propertyid', propertyid);
    formData.append('imgurl',imgurl, imgurl.name);
    formData.append('type', type);
    formData.append('height', height);
    formData.append('width', width);
    formData.append('length', length);
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.post<any>(this._url + '/admin/property/img/add', formData, httpOptions1);
  }

  updatePropertyImg(imageid: number, imgData: PropertiesImg){
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.put(this._url + '/admin/updatepropertyimg/' + imageid, imgData, httpOptions1);
  }

  deletePropertyImg(imageid: number){
    let token = localStorage.getItem('access_token');
    let k = "Bearer " + token;
    
  const httpOptions1 = { headers: new HttpHeaders({"Authorization": k})   };
    return this.http.delete(this._url + '/admin/property/img/remove/' + imageid, httpOptions1);
  }


}
