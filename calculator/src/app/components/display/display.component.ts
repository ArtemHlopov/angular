import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [KeyboardComponent, NgClass],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  public number: string;

  constructor() {
    this.number = '';
  }

  @Input() theme: boolean = false;

  changeNumber(num: string): void {
    this.number = num;
  }
}
