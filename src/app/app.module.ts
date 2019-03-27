import { BrowserModule, Title  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShower } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faToilet } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Angular4PaystackModule} from 'angular4-paystack';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HostelComponent } from './hostel/hostel.component';
import { HotelComponent } from './hotel/hotel.component';
import { RentComponent } from './rent/rent.component';
import { PropertyComponent } from './property/property.component';

import { Schools } from './interfaces/schools';

import { HostelService } from './services/hostel.service';
import { AuthService } from './services/authservice.service';
import { AdminService } from './services/admin.service';
import { UserinfoService } from './services/userinfo.service';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { PropertyListComponent } from './admin/property-list/property-list.component';
import { APropertyComponent } from './admin/property/property.component';
import { AddimagesComponent } from './admin/addimages/addimages.component';
import { PaymentListComponent } from './admin/payment-list/payment-list.component';
import { MybankComponent } from './admin/mybank/mybank.component';
import { ComplainsComponent } from './admin/complains/complains.component';
import { AuthGuard } from './services/auth-guard.service';
import { PropertypageComponent } from './admin/propertypage/propertypage.component';
import { TenantsComponent } from './admin/tenants/tenants.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainpanelComponent } from './mainpanel/mainpanel.component';
import { SubpropertyComponent } from './admin/subproperty/subproperty.component';
import { BookComponent } from './admin/book/book.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TermsComponent } from './terms/terms.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyfavouriteComponent } from './admin/myfavourite/myfavourite.component';
import { MypaymentComponent } from './admin/mypayment/mypayment.component';



@NgModule({
  declarations: [
    AppComponent,
    HostelComponent,
    HotelComponent,
    RentComponent,
    PropertyComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    AdminComponent,
    APropertyComponent,
    PropertyListComponent,
    AddimagesComponent,
    PaymentListComponent,
    MybankComponent,
    ComplainsComponent,
    PropertypageComponent,
    TenantsComponent,
    MenuComponent,
    SidebarComponent,
    MainpanelComponent,
    SubpropertyComponent,
    BookComponent,
    NotfoundComponent,
    TermsComponent,
    HomepageComponent,
    MyfavouriteComponent,
    MypaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    Angular4PaystackModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: '', 
        component: HomepageComponent
      },
      {
        path: 'hotel', 
        component: HotelComponent
      },
      {
        path: 'hostel', 
        component: HostelComponent
      },
      {
        path: 'terms', 
        component: TermsComponent
      },
      {
        path: 'properties/:propertytype/:propertyid', 
        component: PropertyComponent
      },
      {
        path: 'rent', 
        component: RentComponent
      },
      {
        path: 'login', 
        component: LoginComponent
      },
      {
        path: 'signup', 
        component: SignupComponent
      },
      {
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/addproperty', 
        component: APropertyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/addproperty/:propertyid', 
        component: APropertyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/subproperty', 
        component: SubpropertyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/mybank', 
        component: MybankComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/complains', 
        component: ComplainsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/pp/:propertyid', 
        component: PropertypageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'book/:propertyid', 
        component: BookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'book/:propertyid/:subpropertyid', 
        component: BookComponent,
        canActivate: [AuthGuard]
      },
     
      {
        path: '**', 
        component: NotfoundComponent
      }
    ])
  ],
  providers: [
    Title,
    HostelService, 
    AuthService, 
    AdminService,
    Schools,
    UserinfoService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   *
   */
  constructor() {
    library.add(
faShower,faCar, faToilet, faBed,faCamera,faHeart,faCheckCircle,
faEye,faAt,faGripLines,faHome,faCity,faGraduationCap,faBuilding,faUserCircle,
faPowerOff,faMapMarker,faComments,faDoorOpen,faDoorClosed,faSearch);
    
  }
 }
