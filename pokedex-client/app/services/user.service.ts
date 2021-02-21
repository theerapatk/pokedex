import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(user: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/${user._id}`);
  }

}
