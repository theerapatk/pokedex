import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UserService } from '@services/user.service';
import { CustomValidators } from '@utils/custom-validators';
import { ToastrService } from 'ngx-toastr';

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
    }, CustomValidators.compareConfirmPassword)
  });

  @Input() data = { _id: '', fieldName: '', value: '' };
  @ViewChild('currentPassword') currentPasswordElement: any;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void { this.subscribeChangePasswordCheckboxEvent(); }

  private subscribeChangePasswordCheckboxEvent(): void {
    this.changePasswordForm.controls.changePasswordCheckbox.valueChanges.subscribe(
      (checked: boolean) => {
        this.enableCredentialForm = checked;
        if (checked) {
          setTimeout(() => {
            this.currentPasswordElement.nativeElement.focus();
          }, 0);
        }
      }
    );
  }

  onChangePasswordCheckboxChanged(event: MatCheckboxChange): void {
    this.enableCredentialForm = event.checked;
  }

  onSubmit(): void {
    this.isLoading = true;
    const credentialForm = this.changePasswordForm.controls.credential;
    credentialForm.disable();
    const currentPassword = credentialForm.get('currentPassword')?.value;
    const password = credentialForm.get('password')?.value;
    const confirmPassword = credentialForm.get('confirmPassword')?.value;
    this.userService.changePassword(this.data._id, { currentPassword, password, confirmPassword }).subscribe(
      response => this.handleSuccessfulUpdate(),
      errorResponse => this.handleErrorUpdate(errorResponse)
    );
  }

  private handleSuccessfulUpdate(): void {
    this.isLoading = false;
    const credentialForm = this.changePasswordForm.controls.credential;
    credentialForm.enable();
    this.changePasswordForm.reset();
    this.changePasswordForm.markAsPristine();
    this.toastrService.success('Update successful');
  }

  private handleErrorUpdate(errorResponse: any): void {
    this.isLoading = false;
    const credentialForm = this.changePasswordForm.controls.credential;
    credentialForm.enable();
    this.toastrService.warning(errorResponse?.error?.error?.message);
  }

  get hasRequiredOrAlphanumericError(): boolean {
    const passwordControl = this.changePasswordForm.controls.credential.get('password');
    return false;
  }

  get hasRequiredOrNumberError(): boolean {
    const passwordControl = this.changePasswordForm.controls.credential.get('password');
    return false;

  }

  get hasRequiredOrNonAlphanumericError(): boolean {
    const passwordControl = this.changePasswordForm.controls.credentialForm.get('password');
    return false;
  }

}
