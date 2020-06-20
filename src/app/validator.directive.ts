
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[validateDiscount][formControlName],[validateDiscount][formControl],[validateDiscount][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DiscountValidatorDirective), multi: true }
  ]
})
export class DiscountValidatorDirective implements Validator {
  constructor( @Attribute('validateDiscount') public validateDiscount: string) { }

  validate(c: AbstractControl): { [key: string]: any } {
    let value = String(c.value).replace('%', '')

    if (value && Number(value) <= 100 && Number(value) >= 0) {
      return null
    }

    return {
      validateDiscount: "*invalid input*"
    }
  }
}