import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {

  it('should create an instance', () => {
    expect(new CustomValidators()).toBeTruthy();
  });

  // [null, undefined, ''].forEach(testCase => {
  //   it(`#atLeastTwoValidator should not have error when the input value is null or empty,
  //       given the test input is: ${testCase}`, () => {
  //     const atLeastTwoValidator = CustomValidators.atLeastTwoValidator();
  //     const control = new FormControl('input');
  //     control.setValue(testCase);
  //     expect(atLeastTwoValidator(control)).toBeNull();
  //   });
  // });

  // ['3La%', '+fG', '8^', '!@#vV', '0Ut', '!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~9'].forEach(testCase => {
  //   it(`#atLeastTwoValidator should not have error when there are 2 or more conditions met,
  //       given the test input is: ${testCase}`, () => {
  //     const atLeastTwoValidator = CustomValidators.atLeastTwoValidator();
  //     const control = new FormControl('input');
  //     control.setValue(testCase);
  //     expect(atLeastTwoValidator(control)).toBeNull();
  //   });
  // });

  // ['019', 'AB9', 'Zy', '+', ':/', 'ooo', '!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'].forEach(testCase => {
  //   it(`#atLeastTwoValidator should have error when there is only 1 condition met,
  //       given the test input is: ${testCase}`, () => {
  //     const atLeastTwoValidator = CustomValidators.atLeastTwoValidator();
  //     const control = new FormControl('input');
  //     control.setValue(testCase);
  //     expect(atLeastTwoValidator(control)).toEqual({ atLeastTwo: true });
  //   });
  // });

  it('#compareConfirmPassword should not have error given the password and confirmed password matched', () => {
    const credentialFormGroup = new FormGroup({
      password: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: '', disabled: false }, Validators.required),
    });

    CustomValidators.compareConfirmPassword(credentialFormGroup);

    const confirmPasswordControl = credentialFormGroup.get('confirmPassword') as FormControl;
    expect(confirmPasswordControl.hasError('passwordMismatch')).toBe(false);
  });

  it('#compareConfirmPassword should have error given the password and confirmed password mismatched', () => {
    const credentialFormGroup = new FormGroup({
      password: new FormControl({ value: 'MISMatch', disabled: false }, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl({ value: 'misMatch', disabled: false }, Validators.required),
    });

    CustomValidators.compareConfirmPassword(credentialFormGroup);

    const confirmPasswordControl = credentialFormGroup.get('confirmPassword') as FormControl;
    expect(confirmPasswordControl.hasError('passwordMismatch')).toBe(true);
  });

});
