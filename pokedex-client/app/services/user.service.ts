import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user`, user);
  }

  login(credentials: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, credentials);
  }

  getUser(user: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/${user._id}`);
  }

}
