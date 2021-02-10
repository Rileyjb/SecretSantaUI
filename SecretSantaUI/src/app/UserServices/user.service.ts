import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from '../login/models/Users.model';
import { environmentApi } from '../enums/environment.enum';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly APIURL= environment.production ? `${environmentApi.Prod}/api` : `${environmentApi.Dev}/api`;

  userId = new BehaviorSubject<number>(0);
  
  userId$ = this.userId.asObservable()

  constructor(private http:HttpClient) { }

  /** API CALLS */
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

  getGroupUsers(groupId: number): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.APIURL}/GetGroupUsers?groupId=${groupId}`)
    .pipe(catchError((error: any) => 
        throwError(error)
      )
    );
  }

  setSecretSanta(userId: number, groupId: number, santaId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.APIURL}/SetSecretSanta?userId=${userId}&groupId=${groupId}&santaId=${santaId}`, null)
    .pipe(catchError((error: any) => 
        throwError(error)
      )
    );
  }

  updateUser(newUser: Users): Observable<Users> {
    return this.http.post<Users>(`${this.APIURL}/UpdateUser?newUser=`, newUser)
      .pipe(catchError((error: any) => 
        throwError(error)
        )
      );
  }

  /** SERVICES */
  setCurrentUser(user: any){
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('expire', JSON.stringify((new Date)));
  }
}
