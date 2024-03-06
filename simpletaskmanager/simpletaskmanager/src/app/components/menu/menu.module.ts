import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [FormsModule],
  exports: [MenuComponent],
})
export class MenuModule {}
