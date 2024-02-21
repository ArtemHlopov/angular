// import { NgClass, NgFor } from '@angular/common';
import {
  Component, Output, EventEmitter, Input,
} from '@angular/core';
import {
  // FromEnumToArrayPipe,
  numAfterDot,
  Numbers,
  Operation,
  ZeroValue,
} from '../types';

@Component({
  selector: 'app-keyboard',
  // standalone: true,
  // imports: [NgFor, NgClass, FromEnumToArrayPipe],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
})
export class KeyboardComponent {
  public numbers: string[];

  public operations: string[];

  constructor() {
    this.numbers = Object.keys(Numbers);
    this.operations = Object.values(Operation);
  }

  @Input() theme: boolean = false;

  startVal = '';

  firstNum = '';

  oper = '';

  secNum = '';

  @Output() showNum = new EventEmitter<string>();

  makeOperation(op: string): void {
    if (op !== Operation.equal && op !== Operation.reset) {
      if (this.firstNum !== this.startVal) {
        this.oper = op;
      }
    }
    if (op === Operation.equal) {
      if (
        this.oper === Operation.divide
        && ZeroValue.val.includes(this.secNum)
      ) {
        this.makeOperation(Operation.reset);
        this.showNum.emit(ZeroValue.msg);
      } else {
        if (this.firstNum !== this.startVal && this.secNum !== this.startVal) {
          this.firstNum = this.calculate(this.firstNum, this.oper, this.secNum);
        }
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
    }
  }

  setVal(num: string): void {
    const curVal = num;
    if (!this.oper) {
      if (
        this.firstNum === String(Numbers.zero)
        && curVal === String(Numbers.zero)
      ) {
        this.showNum.emit(curVal);
      } else {
        if (this.firstNum === String(Numbers.zero)) {
          this.firstNum = curVal;
        } else {
          this.firstNum += curVal;
        }
        this.showNum.emit(this.firstNum);
      }
    } else if (
      this.secNum === String(Numbers.zero)
      && curVal === String(Numbers.zero)
    ) {
      this.showNum.emit(curVal);
    } else {
      if (this.secNum === String(Numbers.zero)) {
        this.secNum = curVal;
      } else {
        this.secNum += curVal;
      }
      this.showNum.emit(this.secNum);
    }
  }

  calculate = (f: string, o: string, s: string): string => {
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
      default:
        break;
    }

    return String(result.toFixed(numAfterDot));
  };
}
