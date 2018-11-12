import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import { AppComponent} from './app.component';

const routes: Routes = [{path:'', component: AppComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'Login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
