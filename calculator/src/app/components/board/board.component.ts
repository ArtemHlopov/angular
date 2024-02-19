import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DisplayComponent, NgClass],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  theme = false;

  switchTheme(): void {
    if (this.theme) {
      this.theme = false;
    } else {
      this.theme = true;
    }
    // this.theme ? (this.theme = false) : (this.theme = true);
  }
}
