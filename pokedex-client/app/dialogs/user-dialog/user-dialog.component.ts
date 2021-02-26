import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  isLoading = false;
  isCreatingNew = false;
  errorMessage = 'Please try again later';
  roleOptions: { value: number, viewValue: string }[] = [];

  trainerForm = this.fb.group({
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    name: [{ value: '', disabled: true }, [Validators.required]],
    role: [{ value: 2, disabled: true }, [Validators.required]]
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row?: User }
  ) { }

  ngOnInit(): void {
    this.roleOptions = [
      { value: 1, viewValue: 'Admin' },
      { value: 2, viewValue: 'Trainer' }
    ];

    this.initForm();
  }

  private initForm(): void {
    if (this.data && this.data.row) {
      this.initUpdateForm();
    } else {
      this.isCreatingNew = true;
    }
  }

  private initUpdateForm(): void {
    const { _id, email, name } = this.data.row as User;
    this.trainerForm.patchValue({ _id, email, name, role: 2 });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.trainerForm.disable();

    if (this.isCreatingNew) {
      this.createUser();
    } else {
      if (this.trainerForm.dirty) {
        this.updateUser();
      }
    }
  }

  private buildRequestBody(): User {
    return {
      email: this.trainerForm.controls.email.value,
      name: this.trainerForm.controls.name.value,
      role: this.trainerForm.controls.role.value
    };
  }

  private createUser(): void {
    this.userService.createUser(this.buildRequestBody()).subscribe(
      response => this.handleSuccessfulResponse(this.trainerForm),
      errorResponse => this.handleErrorResponse(this.trainerForm, errorResponse,
        { errorCode: 'duplicate', controlName: 'name' })
    );
  }

  private updateUser(): void {
    this.userService.updateUser(this.data.row?._id!, this.buildRequestBody()).subscribe(
      response => this.handleSuccessfulResponse(this.trainerForm, this.data.row?._id),
      errorResponse => this.handleErrorResponse(this.trainerForm, errorResponse,
        { errorCode: 'duplicate', controlName: 'name' })
    );
  }

  handleSuccessfulResponse(formGroup: FormGroup, entityId?: string): void {
    this.isLoading = false;
    formGroup.enable();
    this.dialogRef.close({
      success: true,
      isCreatingNew: this.isCreatingNew,
      entityId
    });
  }

  handleErrorResponse(
    formGroup: FormGroup, errorResponse: HttpErrorResponse,
    duplicateEntity?: { errorCode: string, controlName: string }): void {

    this.isLoading = false;

    if (errorResponse && errorResponse.error && errorResponse.error.errors) {
      const error = errorResponse.error.errors[0];
      if (duplicateEntity) {
        if (error.errorCode === duplicateEntity.errorCode) {
          formGroup.controls[duplicateEntity.controlName].setErrors({ duplicateField: true });
          this.errorMessage = error.errorMessage;
        }
      } else {
        this.errorMessage = error.errorMessage;
      }
    }

    this.popupWarningToast();
  }

  popupWarningToast(): void {
    const toastTitle = this.isCreatingNew ? 'Create Failed' : 'Update Failed';
    this.toastrService.warning(this.errorMessage, toastTitle);
  }

}
