import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { EditRemovebtn } from '../../directives/editremovebtn.directive';
import { DataService } from '../../services/data-service.service';
import { Task } from '../../types';
import { MenuComponent } from '../menu/menu.component';
import {
  faSquare,
  faCheckSquare,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mainboard',
  standalone: true,
  imports: [
    MenuComponent,
    NgIf,
    NgFor,
    EditRemovebtn,
    FormsModule,
    NgClass,
    FontAwesomeModule,
  ],
  providers: [DataService],
  templateUrl: './mainboard.component.html',
  styleUrl: './mainboard.component.scss',
})
export class MainboardComponent implements OnInit {
  constructor(public data: DataService, library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, faXmark, faCheck);
  }

  tasks: Task[] = [];

  taskForChange: Task = {
    id: 0,
    title: '',
  };

  ngOnInit(): void {
    this.updateData();
  }

  updateData(): void {
    this.tasks = this.data.getData();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((el) => el.id !== id);
    this.data.removeTask(this.tasks);
  }

  changeStatus(task: Task): void {
    task.status = !task.status;
    this.data.updateDataStatus(task);
  }

  filterTask(e: string): void {
    this.tasks = this.data.getData();
    this.tasks = this.tasks.filter((el) => el.id === Number(e));
  }

  clearBoard(): void {
    this.tasks = [];
  }

  upadateTask(updTaskId: number, newText: string) {
    console.log('tyt', updTaskId, newText);
    this.data.updateTask(updTaskId, newText);
  }
}
