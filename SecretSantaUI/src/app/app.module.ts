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
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserWishlistComponent } from './user-wishlist/Components/user-wishlist.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateUserComponent,
    GroupsComponent,
    NavBarComponent,
    AddGroupComponent,
    DeleteGroupComponent,
    UserListComponent,
    UserWishlistComponent,
    
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
