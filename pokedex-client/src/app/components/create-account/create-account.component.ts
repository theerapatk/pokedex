import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SlideAnimation } from '@animations/slide-animation';
import { CustomValidators } from '@utils/custom-validators';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  animations: [SlideAnimation]
})
export class CreateAccountComponent implements OnInit {

  isCreatingNew = true;
  hidePassword = true;
  hideConfirmPassword = true;

  createAccountForm = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, Validators.required),
    credential: new FormGroup({
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: '', disabled: false }, Validators.required),
    }, CustomValidators.passwordMatchValidator)
  });

  @Input() animationState = 0;
  @Output() animationStateChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onSubmit(): void { }

  onBackToLogIn(): void {
    this.createAccountForm.reset();
    this.animationStateChange.emit(0);
  }

}
