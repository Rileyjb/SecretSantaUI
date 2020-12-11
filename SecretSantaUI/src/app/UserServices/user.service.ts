import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from '../login/models/Users.model';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly APIURL='http://localhost:54605/api';

  currentUser = new BehaviorSubject<Users>(new Users);
  userId = new BehaviorSubject<number>(0);
  
  currentUser$ = this.currentUser.asObservable();
  userId$ = this.userId.asObservable()

  constructor(private http:HttpClient) { }

  // Get user list
  getUserList():Observable<any[]> {
    return this.http.get<any>(this.APIURL+'/GetUserList')
      .pipe(catchError((error: any) => 
        throwError(error)
      )
    );
  }

  addNewUser(newUser: Users):Observable<any[]> {
    return this.http.post<any[]>(this.APIURL+"/AddNewUser?newUser=", newUser)
      .pipe(catchError((error: any) => 
        throwError(error)
      )
    );
  }

  setCurrentUser(user: any){
    this.currentUser.next(user);
    this.userId.next(user.id);
  }
}
