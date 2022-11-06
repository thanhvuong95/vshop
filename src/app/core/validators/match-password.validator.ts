import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MatchPasswordValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [k: string]: any } | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (
      confirmPassword.value &&
      password.value &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ notMatch: true });
    }
    return null;
  };
}
