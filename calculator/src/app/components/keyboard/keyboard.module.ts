import { NgClass, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { FromEnumToArrayPipe } from '../types';
import { KeyboardComponent } from './keyboard.component';

@NgModule({
  declarations: [KeyboardComponent, FromEnumToArrayPipe],
  imports: [NgFor, NgClass],
  exports: [KeyboardComponent],
})
export class KeyboardModule {}
