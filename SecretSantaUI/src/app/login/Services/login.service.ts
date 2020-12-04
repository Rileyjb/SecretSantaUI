import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedIn.asObservable();

  readonly APIURL='http://localhost:54605/api';


  constructor(private http:HttpClient) { }

  getLogin(user: Login) :Observable<any[]>{
    const url = `${this.APIURL}/GetLogin?user=${user.username}&pass=${user.password}`;

    return this.http.get(url) 
      .pipe(map((res: any) => {
        return res;
      }), 
      catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    );
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }
}