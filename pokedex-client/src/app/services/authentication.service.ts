import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
  currentUser: any = {};

  constructor(
    private userService: UserService,
    private jwtHelper: JwtHelperService
  ) { }

  login(credentials: any): Observable<any> {
    return this.userService.login(credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        const decodedUser = this.decodeUserFromToken(response.token);
        this.setCurrentUser(decodedUser);
        console.log(this.currentUser);
        this.isLoggedIn = true;
      })
    );
  };

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.currentUser = {};
  }

  decodeUserFromToken(token: any): object {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser: any): void {
    this.isLoggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.name = decodedUser.name;
    this.currentUser.email = decodedUser.email;
    this.currentUser.role = decodedUser.role;
    delete decodedUser.role;
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
