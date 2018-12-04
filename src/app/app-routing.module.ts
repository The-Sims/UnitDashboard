import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
    { path: '',component:LoginComponent},
    { path: 'Login', component: LoginComponent },
    { path: 'Home',component:HomeComponent},
    { path: 'Order/:Order',component:OrderComponent}
];
@NgModule({

  imports: [
    CommonModule,RouterModule.forRoot(routes)

  ],
  declarations: [],
    exports:[RouterModule]
})


export class AppRoutingModule { }

