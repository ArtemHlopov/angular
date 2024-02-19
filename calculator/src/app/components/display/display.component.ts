import { Component } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [KeyboardComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  public number: string;
  constructor() {
    this.number = '';
  }
  changeNumber(num: string): void {
    this.number = num;
    console.log(`ne ekrane ${this.number}`);
  }
}
