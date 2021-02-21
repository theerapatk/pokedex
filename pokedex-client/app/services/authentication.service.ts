import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
  currentUser: any = {};

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) { this.decodeUserFromToken(accessToken); }
  }

  register(user: any): Observable<any> {
    return this.http.post<any>('/auth/register', user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>('/auth/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        this.decodeUserFromToken(response.accessToken);
        this.isLoggedIn = true;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
    this.currentUser = {};
  }

  decodeUserFromToken(accessToken: string): void {
    try {
      const decodedUser = this.jwtHelper.decodeToken(accessToken).user;
      this.setCurrentUser(decodedUser);
    } catch (error) {
      this.isLoggedIn = false;
    }
  }

  setCurrentUser(decodedUser: any): void {
    this.isLoggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.name = decodedUser.name;
    this.currentUser.email = decodedUser.email;
    this.currentUser.role = decodedUser.role;
    delete decodedUser.role;
  }

}
