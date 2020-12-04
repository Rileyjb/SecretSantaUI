import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../login/models/Users.model';
import { Login } from '../login/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly APIURL='http://localhost:54605/api';

  currentUser = new Subject<Users>();
  isLoggedIn = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUser.asObservable();
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http:HttpClient) { }

  // Get user list
  getUserList():Observable<any[]> {
    return this.http.get<any>(this.APIURL+'/GetUserList')
      .pipe(catchError((error: any) => 
        throwError(error)
      )
    );
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }

  addNewUser(newUser: Users):Observable<any[]> {
    return this.http.post<any[]>(this.APIURL+"/AddNewUser?newUser="+newUser, newUser)
      .pipe(catchError((error: any) => 
        throwError(error)
      )
    );
  }

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


  setCurrentUser(user: any){
    this.currentUser.next(user);
  }
}
