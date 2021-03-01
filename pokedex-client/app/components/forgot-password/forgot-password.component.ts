import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SlideAnimation } from '@animations/slide-animation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [SlideAnimation]
})
export class ForgotPasswordComponent implements OnInit {

  createAccountForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, Validators.required)
  });

  @Input() animationState = 0;
  @Output() animationStateChange = new EventEmitter<number>();
  @Output() isLoading = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit(): void { }

  onSubmit(): void { }

  onBackToLogIn(): void {
    this.createAccountForm.reset();
    this.isLoading.emit(false);
    this.animationStateChange.emit(0);
  }

}
