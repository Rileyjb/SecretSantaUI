import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/Services/login.service';
import { UserServiceService } from './UserServices/user.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expirationTimer = 1000 * 60 * 60; /** 1 hour */
    const now = new Date().getTime();

    const user: any = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const expire = new Date(JSON.parse(localStorage.getItem('expire') || '{}')).getTime();
    
    if (user && now - expire < expirationTimer) {
      return true;
    } else {
      this.router.navigate(['']);
      localStorage.removeItem('currentUser');
      return false;
    }
  }
  
}
