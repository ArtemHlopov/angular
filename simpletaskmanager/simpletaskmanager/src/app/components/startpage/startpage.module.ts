import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnterbtnDirective } from '../../directives/enterbtn.directive';
import { StartpageComponent } from './startpage.component';

@NgModule({
  declarations: [StartpageComponent],
  imports: [RouterOutlet, EnterbtnDirective],
  exports: [StartpageComponent],
})
export class StartPageModule {}
