import { Pipe, PipeTransform } from '@angular/core';

export enum Numbers {
  zero = 0,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
}

export enum Operation {
  plus = '+',
  minus = '-',
  divide = '/',
  mult = '*',
  equal = '=',
  reset = 'reset',
}

export const numAfterDot = 2;

export const ZeroValue = {
  val: ['0', '-0'],
  msg: 'На ноль делить нельзя',
};

@Pipe({
  name: 'fromEnumToArray',
  // standalone: true,
})
export class FromEnumToArrayPipe implements PipeTransform {
  transform(arr: any) {
    if (arr && Array.isArray(arr)) {
      return arr.slice(0, -(arr.length / 2));
    }
    return arr;
  }
}
