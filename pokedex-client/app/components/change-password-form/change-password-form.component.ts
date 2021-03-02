import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CustomValidators } from '@utils/custom-validators';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

  isLoading = false;
  enableCredentialForm = false;
  hideCurrentPassword = true;
  hidePassword = true;
  hideConfirmPassword = true;

  changePasswordForm = new FormGroup({
    changePasswordCheckbox: new FormControl({ value: false, disabled: false }),
    credential: new FormGroup({
      currentPassword: new FormControl({ value: '', disabled: false }, Validators.required),
      password: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        // CustomValidators.atLeastTwoValidator(),
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl({ value: '', disabled: false }, Validators.required)
    }, CustomValidators.passwordMatchValidator)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onChangePasswordCheckboxChanged(event: MatCheckboxChange) {
    this.enableCredentialForm = event.checked;
  }

  onSubmit(): void { }

  get hasRequiredOrAlphanumericError() {
    const passwordControl = this.changePasswordForm.controls.credential.get('password');
    return false;
  }

  get hasRequiredOrNumberError() {
    const passwordControl = this.changePasswordForm.controls.credential.get('password');
    return false;

  }

  get hasRequiredOrNonAlphanumericError() {
    const passwordControl = this.changePasswordForm.controls.credentialForm.get('password');
    return false;
  }

}
