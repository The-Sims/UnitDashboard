import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import { AppComponent} from './app.component';

const routes: Routes = [{path:'', component: LoginComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'Login', component: LoginComponent}];


export const routing = RouterModule.forRoot(routes);

