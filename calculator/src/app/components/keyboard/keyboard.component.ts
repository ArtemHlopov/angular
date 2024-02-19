import { NgFor } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { numAfterDot, Numbers, Operation, ZeroValue } from '../types';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  public numbers: string[];
  public operations: string[];
  constructor() {
    this.numbers = Object.keys(Numbers).slice(
      0,
      -(Object.keys(Numbers).length / 2)
    );
    this.operations = Object.values(Operation);
    console.log(this.numbers, this.operations);
  }
  startVal = '';
  firstNum = '';
  oper = '';
  secNum = '';

  @Output() showNum = new EventEmitter<string>();
  makeOperation(op: string) {
    if (op !== Operation.equal && op !== Operation.reset) {
      this.oper = op;
      if (this.firstNum !== this.startVal) {
        console.log(
          `oper - ${op}`,
          `eto pervi ${this.firstNum}`,
          `eto vtoroi ${this.secNum}`
        );
      }
    }
    if (op === Operation.equal) {
      console.log('tyt', this.firstNum, this.oper, this.secNum);
      if (
        this.oper === Operation.divide &&
        ZeroValue.val.includes(this.secNum)
      ) {
        this.makeOperation(Operation.reset);
        this.showNum.emit(ZeroValue.msg);
      } else {
        this.firstNum !== this.startVal && this.secNum !== this.startVal
          ? (this.firstNum = this.calculate(
              this.firstNum,
              this.oper,
              this.secNum
            ))
          : this.startVal;
        this.oper = this.startVal;
        this.secNum = this.startVal;
        this.showNum.emit(this.firstNum);
      }
    }
    if (op === Operation.reset) {
      this.firstNum = this.startVal;
      this.oper = this.startVal;
      this.secNum = this.startVal;
      this.showNum.emit(this.startVal);
      console.log('restart');
    }
  }
  setVal(num: string) {
    let curVal = num;
    if (!this.oper) {
      if (
        this.firstNum === String(Numbers.zero) &&
        curVal === String(Numbers.zero)
      ) {
        this.showNum.emit(curVal);
      } else {
        this.firstNum === String(Numbers.zero)
          ? (this.firstNum = curVal)
          : (this.firstNum = this.firstNum + curVal);
        this.showNum.emit(this.firstNum);
      }
    } else {
      if (
        this.secNum === String(Numbers.zero) &&
        curVal === String(Numbers.zero)
      ) {
        this.showNum.emit(curVal);
      } else {
        this.secNum === String(Numbers.zero)
          ? (this.secNum = curVal)
          : (this.secNum = this.secNum + curVal);
        this.showNum.emit(this.secNum);
      }
    }
  }

  calculate(f: string, o: string, s: string): string {
    console.log('v kalke', typeof o, o, typeof Operation.plus, Operation.plus);
    let result = 0;
    switch (o) {
      case Operation.plus:
        result = Number(f) + Number(s);
        break;
      case Operation.minus:
        result = Number(f) - Number(s);
        break;
      case Operation.mult:
        result = Number(f) * Number(s);
        break;
      case Operation.divide:
        result = Number(f) / Number(s);
        break;
    }

    return String(result.toFixed(numAfterDot));
  }
}
