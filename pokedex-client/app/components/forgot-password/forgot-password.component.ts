import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SlideAnimation } from '@animations/slide-animation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [SlideAnimation]
})
export class ForgotPasswordComponent {

  createAccountForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required)
  });

  @Input() animationState = 0;
  @Output() animationStateChange = new EventEmitter<number>();
  @Output() isLoading = new EventEmitter<boolean>(false);

  onSubmit(): void {
    throw new Error('Method not implemented.');
  }

  onBackToLogIn(): void {
    this.createAccountForm.reset();
    this.isLoading.emit(false);
    this.animationStateChange.emit(0);
  }

}
