import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function positiveNumberValidator(control: AbstractControl)  {
  const value = parseInt(control.value);
  if (value > 0) {
    return null;
  }
  return {positiveNumber: false};
}
