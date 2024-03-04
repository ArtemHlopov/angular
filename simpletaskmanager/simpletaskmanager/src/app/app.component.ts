import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MainboardComponent } from './components/mainboard/mainboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditRemovebtn } from './directives/editremovebtn.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    MainboardComponent,
    FontAwesomeModule,
    EditRemovebtn,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'simpletaskmanager';
}
