import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SlideAnimation } from '@animations/slide-animation';
import { UserService } from '@services/user.service';
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
    email: new FormControl({ value: '', disabled: false }, Validators.required),
    credential: new FormGroup({
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: '', disabled: false }, Validators.required),
    }, CustomValidators.passwordMatchValidator)
  });

  @Input() animationState = 0;
  @Output() animationStateChange = new EventEmitter<number>();

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const creatUser = {
      email: this.createAccountForm.get('email')?.value,
      password: this.createAccountForm.controls.credential.get('password')?.value
    };
    this.userService.createUser(creatUser).subscribe(
      (response: any) => this.onBackToLogIn(),
      (errorResponse: any) => console.log(errorResponse)
    );
  }

  onBackToLogIn(): void {
    this.createAccountForm.reset();
    this.animationStateChange.emit(0);
  }

}
