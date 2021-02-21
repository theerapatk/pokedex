import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {

  static readonly HAS_ALPHANUMERIC_REGEX = /[a-z].*[A-Z]|[A-Z].*[a-z]/;
  static readonly HAS_NUMBER_REGEX = /\d/;
  static readonly HAS_NON_ALPHANUMERIC_REGEX = /^(?=.*?["!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~"])/;

  // static atLeastTwoValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     if (!control.value) {
  //       return null;
  //     }

  //     const hasAlphanumeric = CustomValidators.HAS_ALPHANUMERIC_REGEX.test(control.value);
  //     const hasNumber = CustomValidators.HAS_NUMBER_REGEX.test(control.value);
  //     const hasNonAlphanumeric = CustomValidators.HAS_NON_ALPHANUMERIC_REGEX.test(control.value);
  //     const hasAtLeastTwo = hasAlphanumeric ?
  //       (hasNumber || hasNonAlphanumeric) : (hasNumber && hasNonAlphanumeric);
  //     return hasAtLeastTwo ? null : { atLeastTwo: true };
  //   };
  // }

  static passwordMatchValidator(control: AbstractControl): any {
    const passwordControl = control.get('password') as FormControl;
    const confirmPasswordControl = control.get('confirmPassword') as FormControl;
    confirmPasswordControl.setErrors(passwordControl.value !== confirmPasswordControl.value ? { passwordMismatch: true } : null);
  }

}

/*
Courtesy of https://codinglatte.com/posts/angular/cool-password-validation-angular
*/
