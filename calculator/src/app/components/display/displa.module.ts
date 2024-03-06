import { NgClass, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { KeyboardModule } from '../keyboard/keyboard.module';
import { DisplayComponent } from './display.component';

@NgModule({
  declarations: [DisplayComponent],
  imports: [KeyboardModule, NgClass],
  exports: [DisplayComponent],
})
export class DisplayModule {}
