import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Groups } from '../Models/Group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  readonly APIURL='http://localhost:54605/api';

  constructor(private http:HttpClient) { }

  getGroupsByUserId(id: number): Observable<any[]> {
    const URL = `${this.APIURL}/GetGroupById?userId=${id}`;

    return this.http.get(URL)
      .pipe(map((res: any) => {
        return res;
      }),
      catchError( error => {
        return throwError( error );
      })
    );
  }

  CreateNewGroup(group: Groups): Observable<any[]> {
    return this.http.post<any[]>(this.APIURL+"/CreateGroup?user=", group)
      .pipe(
      catchError( error => {
        return throwError( error );
      })
    );
  }
}
