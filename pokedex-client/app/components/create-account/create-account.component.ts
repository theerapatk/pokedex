import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() isLoading = false;
  @Output() animationStateChange = new EventEmitter<number>();
  @Output() accountIsCreating = new EventEmitter<boolean>(false);

  constructor(
    private toastrService: ToastrService,
    private service: AuthenticationService
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.accountIsCreating.emit(true);
    const creatUser = {
      email: this.createAccountForm.get('email')?.value,
      password: this.createAccountForm.controls.credential.get('password')?.value
    };
    setTimeout(() => {
      this.service.register(creatUser).subscribe(
        (response: any) => {
          this.toastrService.success('Successful, you can now log in with your new account');
          this.onBackToLogIn();
        },
        (errorResponse: any) => {
          this.accountIsCreating.emit(false);
          console.log(errorResponse);
        }
      );
    }, 1000);
  }

  onBackToLogIn(): void {
    this.createAccountForm.reset();
    this.accountIsCreating.emit(false);
    this.animationStateChange.emit(0);
  }

}
