import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {DatePipe} from "@angular/common";
import { AppRoutingModule} from "./app-routing.module";
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule
  ],
  providers: [DatePipe,HomeComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
