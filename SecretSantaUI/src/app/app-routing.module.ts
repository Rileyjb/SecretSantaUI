import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { MyGuardGuard } from './my-guard.guard';

const routes: Routes = [
  {path:'', component:LoginPageComponent},
  {path:'create-user', component:CreateUserComponent},
  {path:'groups', component:CreateUserComponent, canActivate: [MyGuardGuard]},
  {path:'**', component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
