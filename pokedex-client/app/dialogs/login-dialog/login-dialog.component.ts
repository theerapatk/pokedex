import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SlideAnimation } from '@animations/slide-animation';
import { CreateAccountComponent } from '@components/create-account/create-account.component';
import { ForgotPasswordComponent } from '@components/forgot-password/forgot-password.component';
import { AuthenticationService } from '@services/authentication.service';
import { FacebookService, LoginOptions, LoginResponse } from 'ngx-facebook';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  animations: [SlideAnimation]
})
export class LoginDialogComponent implements OnInit {

  hidePassword = true;
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

  @ViewChild(CreateAccountComponent)
  private createAccountComponent!: CreateAccountComponent;

  @ViewChild(ForgotPasswordComponent)
  private forgotPasswordComponent!: ForgotPasswordComponent;

  constructor(
    private authService: AuthenticationService,
    private fbService: FacebookService,
    private toastrService: ToastrService,
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    // const initParams: InitParams = {
    //   appId: '2985699581717032',
    //   xfbml: true,
    //   version: 'v9.0'
    // };

    // this.fbService.init(initParams);
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
    this.authService.login({ email, password }).subscribe(
      response => this.handleSuccessfulLogIn(),
      errorResponse => {
        this.isLoading = false;
        this.isCredentialsValid = false;
      }
    );
    // setTimeout(() => {
    // }, 500);
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

  private handleSuccessfulLogIn(): void {
    this.isLoading = false;
    this.toastrService.success('Logged in successfully');
    this.dialogRef.close({ success: true });
  }

  handleNextStep(animationState: number): void {
    this.isFormSubmitted = false;
    this.loginForm.reset();
    this.animationState = animationState;
  }

  onAnimationStateChange(stateNumber: number): void {
    this.animationState = stateNumber;
  }

  onLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  onBackToLogIn(): void {
    if (this.animationState === 1) {
      this.createAccountComponent.onBackToLogIn();
    } else if (this.animationState === 2) {
      this.forgotPasswordComponent.onBackToLogIn();
    }
  }

}
