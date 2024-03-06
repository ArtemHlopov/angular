import { NgClass, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisplayModule } from '../display/displa.module';
import { BoardComponent } from './board.component';

@NgModule({
  declarations: [BoardComponent],
  imports: [DisplayModule, NgClass],
  exports: [BoardComponent],
})
export class BoardModule {}
