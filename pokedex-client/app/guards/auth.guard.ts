import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private authServce: AuthenticationService) { }

  canLoad(): boolean {
    this.authServce.decodeAccessToken();
    const canLoad = this.authServce.isLoggedIn && this.authServce.isAdmin();
    if (!canLoad) {
      this.router.navigate(['/']);
    }
    return canLoad;
  }

}
