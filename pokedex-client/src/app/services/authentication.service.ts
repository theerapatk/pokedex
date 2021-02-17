import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/login`;
    return this.http.post<any>(url, { email, password });
  }

  // postLogin(username: string, password: string): Observable<User> {
  //   const url = `${environment.apiUrl}/login`;
  //   const body = `username=${username}&password=${encodeURIComponent(password)}`;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     })
  //   };
  //   return this.http.post(url, body, httpOptions).pipe(
  //     mergeMap(() => this.userService.getCurrentUser())
  //   );
  // }

}
