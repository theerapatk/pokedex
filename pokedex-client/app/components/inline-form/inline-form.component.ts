import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss']
})
export class InlineFormComponent implements OnInit {

  previousValue = '';
  isLoading = false;
  isEditting = false;

  inlineForm = new FormGroup({
    inputForm: new FormControl({ value: '', disabled: true }, { updateOn: 'submit' })
  });

  @Input() inputLabel = '';
  @Input() data = { _id: '', fieldName: '', value: '' };

  @ViewChild('input') private input!: any;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.previousValue = this.data.value;
    const inputForm = this.inlineForm.controls.inputForm;
    inputForm.setValue(this.data.value);
    if (this.data.fieldName === 'email') {
      inputForm.setValidators([Validators.required, Validators.email]);
    } else if (this.data.fieldName === 'name') {
      inputForm.setValidators(Validators.required);
    }
    inputForm.updateValueAndValidity();
  }

  onBlur(event: FocusEvent) {
    if (!this.isLoading) {
      this.isEditting = !this.isEditting;
    }
    if (event.relatedTarget != null) {
      this.inlineForm.patchValue({ inputForm: this.previousValue });
    }
  }

  onEditClicked(): void {
    this.isEditting = !this.isEditting;
    this.inlineForm.enable();
    this.previousValue = this.inlineForm.controls.inputForm.value;
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  onSubmit(): void {
    if (this.inlineForm.valid && this.inlineForm.dirty) {
      // this.inlineForm.markAsPristine();
      this.isLoading = true;
      this.inlineForm.disable();
      setTimeout(() => {
        this.updateUser();
      }, 2000);
    }
  }

  private updateUser(): void {
    this.userService.updateUser(this.data._id, this.buildRequestBody()).subscribe(
      response => this.handleSuccessfulUpdate(response),
      errorResponse => this.handleErrorUpdate(errorResponse)
    );
  }

  private buildRequestBody() {
    const requestBody = {} as any;
    if (this.data.fieldName === 'email') {
      requestBody.email = this.inlineForm.controls.inputForm.value
    } else if (this.data.fieldName === 'name') {
      requestBody.name = this.inlineForm.controls.inputForm.value
    }
    return requestBody;
  }

  private handleSuccessfulUpdate(response?: any): void {
    this.isLoading = false;
    this.isEditting = false;
    this.inlineForm.enable();
    if (this.data.fieldName === 'email') {
      this.inlineForm.patchValue({ inputForm: response.user.email });
    } else if (this.data.fieldName === 'name') {
      this.inlineForm.patchValue({ inputForm: response.user.name });
    }
    this.inlineForm.markAsPristine();
    this.authService.updateCurrentUser(response.user);
    this.toastrService.success('Update successful');
  }

  private handleErrorUpdate(errorResponse: any): void {
    this.isLoading = false;
    this.isEditting = false;
    this.inlineForm.enable();
    this.inlineForm.patchValue({ inputForm: this.previousValue });
    this.inlineForm.markAsPristine();
    this.toastrService.warning(errorResponse?.error?.error?.message);
  }

  getPlaceholder(): string {
    return this.data.fieldName.charAt(0).toUpperCase() + this.data.fieldName.slice(1);
  }

}
