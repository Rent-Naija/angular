import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, retry  } from 'rxjs/operators';
import { Properties } from '../interfaces/properties';
import { Observable} from 'rxjs';
import { AuthService } from './authservice.service';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable()
export class HostelService {
  //private _url = "http://rentnaija.kavitdigital.com/public/api";
 // private _url = "http://rentnaija.ng/api";
  private _url = "http://rentapi.localhost/api";
  id: number;
  subproperty;
  moreinfo;
 

  formData : Properties;
  constructor(
    private authservice: AuthService,
    private http: HttpClient) { }

  getHostels(): Observable<any>{
    return this.http.get<any>(this._url + '/properties/hostel');
  }

  getViewid(viewid: string): Observable<Properties>{
    return this.http.get<Properties>(this._url + '/propertyview/' + viewid);
  }

  getHotels(): Observable<any>{
    return this.http.get<any>(this._url + '/properties/hotel');
  }

  getrents(): Observable<any>{
    return this.http.get<any>(this._url + '/properties/rent');
  }

  searchHostels(state: any): Observable<Properties[]>{
    return this.http.get<Properties[]>(this._url + '/hostel/' + state );
  }

  searchHotels(state: any, city: any, price: any): Observable<Properties[]>{
    return this.http.get<Properties[]>(this._url + '/hotel/' + state + '/'  + city + '/'  + price);
  }

  searchRent(state: any, city: any, price: any): Observable<Properties[]>{
    return this.http.get<Properties[]>(this._url + '/house/' + state + '/'  + city + '/'  + price);
  }

  
  
  getproperties(type: any, propertyid: number): Observable<any>{
   return this.http.get<any>(this._url + '/' + type + '/'  + propertyid);
  }

  getpropertyinfo(propertyid: number): Observable<any>{
    return this.http.get<any>(this._url + '/subpropertyinfo/'  + propertyid);
  }

  allsubproperty(){
    return this.http.get<any>(this._url + '/subproperty' );
  }

  subProperties(propertyid: any): Observable<any>{
    return this.http.get<any>(this._url + '/subproperty/' + propertyid );
  }

  //beginnning of likes/favourites
  getfavourites(id: number): Observable<any>{
    return this.http.get<any>(this._url + '/likes/' + id, httpOptions);
  }

  checkfavourite(propertyid: number, userid: string ): Observable<any>{
    return this.http.get<any>(this._url + '/likes/' + propertyid + '/' + userid, httpOptions);
  }

  addfavourite(propertyid: number, userid: string ){
    return this.http.post(this._url + '/addlike/' + propertyid + '/' + userid, httpOptions);
  }

  

  //endning of likes/favourites



  propertylist(): Observable<Properties[]>{
    return this.http.get<Properties[]>(this._url + '/allproperty');
  }

}
