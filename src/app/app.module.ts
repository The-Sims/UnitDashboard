import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {DatePipe} from "@angular/common";
import {routing} from "./app-routing.module";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      routing
  ],
  providers: [DatePipe,HomeComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
