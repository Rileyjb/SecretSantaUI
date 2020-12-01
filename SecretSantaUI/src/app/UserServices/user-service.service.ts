import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/Users.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly APIURL='http://localhost:54605/api';
  constructor(private http:HttpClient) { }

  // Get user list
  getUserList():Observable<any[]> {
    return this.http.get<any>(this.APIURL+'/GetUserList');
  }

  addNewUser(newUser: Users):Observable<any[]> {
    return this.http.post<any[]>(this.APIURL+"/AddNewUser?newUser="+newUser, newUser);
  }
}
