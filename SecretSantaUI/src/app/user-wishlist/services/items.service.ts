import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environmentApi } from 'src/app/enums/environment.enum';
import { environment } from 'src/environments/environment';
import { Items } from '../Modal/Items.modal';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  readonly APIURL= environment.production ? `${environmentApi.Prod}/api` : `${environmentApi.Dev}/api`;

  constructor(private http:HttpClient) { }

  public GetItemsById(id: number): Observable<Items[]> {
    return this.http.get<Items>(`${this.APIURL}/GetItemsById?userId=${id}`)
      .pipe(map((res: any) => {
        return res;
      }), 
      catchError( error => {
        return throwError( error );
      })
    );
  }
}
