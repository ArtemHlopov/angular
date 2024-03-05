import { NgClass, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditRemovebtn } from '../../directives/editremovebtn.directive';
import { MenuModule } from '../menu/menu.module';
import { MainboardComponent } from './mainboard.component';

@NgModule({
  declarations: [MainboardComponent],
  imports: [
    MenuModule,
    EditRemovebtn,
    NgIf,
    NgFor,
    FormsModule,
    NgClass,
    FontAwesomeModule,
  ],
  exports: [MainboardComponent],
})
export class MainboardModule {}
