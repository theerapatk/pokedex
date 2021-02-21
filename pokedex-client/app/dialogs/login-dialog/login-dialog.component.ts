import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SlideAnimation } from '@animations/slide-animation';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  animations: [SlideAnimation]
})
export class LoginDialogComponent implements OnInit {

  animationState = 0;
  isLoading = false;
  isFormSubmitted = false;
  isCredentialsValid = true;

  loginForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required),
    credential: new FormGroup({
      password: new FormControl({ value: '', disabled: false }, Validators.required),
    })
  });

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private fbService: FacebookService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    const initParams: InitParams = {
      appId: '2985699581717032',
      xfbml: true,
      version: 'v9.0'
    };

    this.fbService.init(initParams);
  }

  ngOnInit(): void { }

  onLogIn(): void {
    this.isLoading = true;
    this.isFormSubmitted = true;
    this.isCredentialsValid = true;
    this.login();
  }

  private login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.controls.credential.get('password')?.value;
    setTimeout(() => {
      this.authService.login({ email, password }).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.handleSuccessfulLogIn(response);
        },
        (errorResponse: any) => {
          this.isLoading = false;
          this.isCredentialsValid = false;
        }
      );
    }, 1000);
  }

  onFacebookLogIn(): void {
    const options: LoginOptions = {
      scope: 'public_profile',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fbService.login()
      .then((response: LoginResponse) => console.log('Logged in', response))
      .catch(e => console.error('Error logging in'));
  }

  private handleSuccessfulLogIn(user: any): void {
    this.dialogRef.close();
    this.userService.getUser(this.authService.currentUser).subscribe(
      (response: any) => {
        console.log(response);
      },
      (errorResponse: any) => {
        console.log(errorResponse);
      }
    );
  }

  onCreateNewAccount(): void {
    this.isFormSubmitted = false;
    this.loginForm.reset();
    this.animationState = 1;
  }

  onAnimationStateChange(stateNumber: number): void {
    this.animationState = stateNumber;
  }

  onAccountIsCreating(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

}
