import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchTitleDirective } from '../../directives/search-title.directive';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [FormsModule, SearchTitleDirective],
  exports: [MenuComponent],
})
export class MenuModule {}
