import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appIpv]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IpvDirective,
      multi: true,
    },
  ],
})
export class IpvDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const value = control.value;
    const regex = /(([0-9]|[1-9]{1,2}|1[\d]{2}|2[0-5]{2})(\.(?!$)|$)){4}/g;
    return regex.test(value) ? null : { error: 'Your ipv4 isnt correct' };
  }
}
