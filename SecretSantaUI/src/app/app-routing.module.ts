import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { GroupsComponent } from './group/groups/groups.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { MyGuardGuard } from './my-guard.guard';
import { UserListComponent } from './user-list/user-list.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';

const routes: Routes = [
  {path:'', redirectTo: '/groups', pathMatch: 'full', canActivate: [MyGuardGuard]},
  {path:'#', component:LoginPageComponent},
  {path:'create-user', component:CreateUserComponent},
  {path:'groups', component:GroupsComponent, canActivate: [MyGuardGuard]},
  {path:'user-list/:id', component:UserListComponent, canActivate: [MyGuardGuard]},
  {path:'user-list/:id/user/:id', component:UserWishlistComponent, canActivate: [MyGuardGuard]},
  {path:'**', component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
