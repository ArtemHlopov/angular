import { Directive, ElementRef, HostListener } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { domains } from '../domain';

@Directive({
  selector: '[appLogin]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LoginDirective,
      multi: true,
    },
  ],
})
export class LoginDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = control.value;
    const regexAt = /@/g;
    const regexDot = /\./g;
    const regexEmail =
      /^((?!\.)[\w\-_.]*[^.])(@\w{3,})(\.\w+(\.\w+)?[^.\W])$/gm;
    if (!regexAt.test(value)) {
      return { error: 'Email must contains @' };
    }
    if (!regexDot.test(value)) {
      return { error: 'Email must contains dot' };
    }
    if (!domains.find((el) => value.endsWith(el))) {
      return { error: 'This domain doesnt exist' };
    }
    return regexEmail.test(value) ? null : { error: 'Email is invalid' };
  }
}
