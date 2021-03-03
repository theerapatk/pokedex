import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SlideAnimation } from '@animations/slide-animation';
import { AuthenticationService } from '@services/authentication.service';
import { CustomValidators } from '@utils/custom-validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  animations: [SlideAnimation]
})
export class CreateAccountComponent {

  hidePassword = true;
  hideConfirmPassword = true;

  createAccountForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required),
    name: new FormControl({ value: '', disabled: false }, [Validators.required]),
    credential: new FormGroup({
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: '', disabled: false }, Validators.required),
    }, CustomValidators.compareConfirmPassword)
  });

  @Input() animationState = 0;
  @Output() animationStateChange = new EventEmitter<number>();
  @Output() isLoading = new EventEmitter<boolean>(false);

  constructor(
    private toastrService: ToastrService,
    private service: AuthenticationService
  ) { }

  onSubmit(): void {
    this.isLoading.emit(true);

    this.service.register(this.buildRegisterBody()).subscribe(
      response => {
        this.toastrService.success('Success! You can now log in with your new account');
        this.onBackToLogIn();
      },
      errorResponse => {
        this.toastrService.warning(errorResponse?.error?.error?.message);
        this.isLoading.emit(false);
      }
    );
    // setTimeout(() => {
    // }, 500);
  }

  private buildRegisterBody(): any {
    return {
      email: this.createAccountForm.get('email')?.value,
      name: this.createAccountForm.get('name')?.value,
      password: this.createAccountForm.controls.credential.get('password')?.value
    };
  }

  onBackToLogIn(): void {
    this.createAccountForm.reset();
    this.isLoading.emit(false);
    this.animationStateChange.emit(0);
  }

}
