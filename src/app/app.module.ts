import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarosalComponent } from './carosal/carosal.component';
import { DescriptionComponent } from './description/description.component';
import { PricingComponent } from './pricing/pricing.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
//service
import { UserService } from './shared/user.service';
//other 
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarosalComponent,
    DescriptionComponent,
    PricingComponent,
    LandingPageComponent,
    ContactUsComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
