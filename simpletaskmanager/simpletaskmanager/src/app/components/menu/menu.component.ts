import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private dataService: DataService, private router: Router) {}

  // @Output() addTask = new EventEmitter();

  // @Output() searchTask = new EventEmitter();

  // @Output() refreshData = new EventEmitter();

  // @Output() removeAllData = new EventEmitter();

  newTaskName: string = '';

  searchIndex: string = '';

  addNewTask(): void {
    this.dataService.addTask(this.newTaskName);
    // this.addTask.emit();
  }

  searchNewTask(): void {
    // this.searchTask.emit(this.searchIndex);
    // this.dataService.searchById(this.searchIndex);
    this.router.navigate(['app', 'tasks', this.searchIndex]);
  }

  refreshTasks(): void {
    // this.refreshData.emit();
    this.dataService.getData();
    this.router.navigate(['app', 'tasks']);
  }

  removeData(): void {
    this.dataService.clearData();
    // this.removeAllData.emit();
    this.router.navigate(['app', 'tasks']);
  }
}
