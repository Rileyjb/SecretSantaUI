import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupsComponent } from './group/groups/groups.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateUserComponent,
    GroupsComponent,
    NavBarComponent,
    AddGroupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
