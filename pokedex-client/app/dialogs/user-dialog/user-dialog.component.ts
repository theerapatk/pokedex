import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '@models/role.model';
import { User } from '@models/user.model';
import { RoleService } from '@services/role.service';
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
    role: [{ value: 0, disabled: true }, [Validators.required]]
  });

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row?: User }
  ) { }

  ngOnInit(): void {
    if (!this.data || !this.data.row) {
      this.isCreatingNew = true;
    }
    this.initRoleOptions();
  }

  private initRoleOptions() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe(
      response => this.handleSuccessfulGetRoles(response as Role[]),
      errorResponse => this.handleErrorGetRoles()
    );
  }

  private handleSuccessfulGetRoles(roles: Role[]) {
    roles.forEach(role => {
      const { value, text } = role;
      this.roleOptions.push({ value, viewValue: text });
    });
    this.isLoading = false;
    this.trainerForm.enable();
    this.initForm();
  }

  private handleErrorGetRoles() {
    this.isLoading = false;
    this.trainerForm.enable();
  }

  private initForm(): void {
    if (this.data && this.data.row) {
      this.initUpdateForm();
    }
  }

  private initUpdateForm(): void {
    const { _id, email, name, role } = this.data.row as User;
    this.trainerForm.patchValue({ _id, email, name, role: (role as Role)?.value });
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
      response => this.handleSuccessfulUpdate(this.trainerForm, response.email),
      errorResponse => this.handleErrorUpdate(this.trainerForm, errorResponse)
    );
  }

  private updateUser(): void {
    this.userService.updateUser(this.data.row?._id as string, this.buildRequestBody()).subscribe(
      response => this.handleSuccessfulUpdate(this.trainerForm, this.data.row?._id, response),
      errorResponse => this.handleErrorUpdate(this.trainerForm, errorResponse)
    );
  }

  private handleSuccessfulUpdate(formGroup: FormGroup, entityId?: string, response?: any): void {
    this.isLoading = false;
    formGroup.enable();
    this.dialogRef.close({
      success: true,
      isCreatingNew: this.isCreatingNew,
      entityId,
      user: response?.user
    });
  }

  private handleErrorUpdate(formGroup: FormGroup, errorResponse: any): void {
    this.isLoading = false;
    formGroup.enable();
    this.toastrService.warning(errorResponse?.error?.error?.message);
  }

}
