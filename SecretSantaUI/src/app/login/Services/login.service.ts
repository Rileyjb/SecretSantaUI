import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environmentApi } from 'src/app/enums/environment.enum';
import { Login } from '../models/login.model';
import { Users } from '../models/Users.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly APIURL=`${environmentApi.Prod}/api`;


  constructor(private http:HttpClient) { }

  getLogin(user: Login) :Observable<Users[]>{
    const url = `${this.APIURL}/GetLogin?user=${user.username}&pass=${user.password}`;

    return this.http.get(url) 
      .pipe(map((res: any) => {
        return res;
      }), 
      catchError( error => {
        return throwError( error );
      })
    );
  }
}
