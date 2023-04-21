import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EshopInterceptor } from './utilities/EshopInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(
      {
        //به خاطر اینکه ظاهر وب داشته باشد
        animated: false,// نحوه بازشدن صفحه ها
        mode: 'md' //حالت وب سایت
      }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: EshopInterceptor,
    multi: true
  },
    CookieService,
    AuthService,
    ProductsService
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
