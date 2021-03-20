import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environmentApi } from 'src/app/enums/environment.enum';
import { environment } from 'src/environments/environment';
import { Groups } from '../Models/Group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  readonly APIURL= environment.production ? `${environmentApi.Prod}/api` : `${environmentApi.Dev}/api`;

  updateGroupSource = new BehaviorSubject<boolean>(false);
  currentGroupSource = new Subject<Groups>();
  searchGroupSource = new Subject<string>();

  updateGroup$ = this.updateGroupSource.asObservable();
  currentGroup$ = this.currentGroupSource.asObservable();
  searchGroup$ = this.searchGroupSource.asObservable();

  constructor(private http:HttpClient) { }

  /** API SERVICES */
  getGroupsByUserId(id: number): Observable<Groups[]> {
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

  updateSSReady(ssReady: boolean, groupId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.APIURL}/UpdateSS?ssReady=${ssReady}&groupId=${groupId}`,'')
      .pipe(
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

  JoinGroup(group: Groups): Observable<any[]> {
    return this.http.post<any[]>(this.APIURL+"/JoinGroup?newGroup=", group)
      .pipe(
      catchError( error => {
        return throwError( error );
      })
    );
  }

  DeleteGroup(groupId?: number): any {
    return this.http.delete<any[]>(this.APIURL+"/DeleteGroup?groupId="+groupId)
      .pipe(
        catchError( error => {
          return throwError( error );
        })
      );
  }

  SaveGroup(group: Groups): Observable<any[]> {
    return this.http.post<any[]>(`${this.APIURL}/updateGroup?group=`, group)
      .pipe(
        catchError( error => {
          return throwError( error );
        })
      );
  }

  LeaveGroup(groupId: number, userId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.APIURL}/deleteFromGroup?userId=${userId}&groupId=${groupId}`)
      .pipe(
        catchError( error => {
          return throwError( error );
        })
      );
  }

  /** ALL OTHER SERVICES */
  UpdateGroups(newGroup: boolean): void {
    this.updateGroupSource.next(newGroup);
  }

  SetCurrentGroup(currentGroup: Groups): void {
    this.currentGroupSource.next(currentGroup);
  }

  GroupSearch(searchStr: string): void {
    this.searchGroupSource.next(searchStr);
  }
}
