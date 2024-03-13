import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private router: Router, private httpService: HttpService) {}

  newTaskName: string = '';
  searchIndex: string = '';
  searchTitle: string = '';

  addNewTask(): void {
    this.httpService.addTask(this.newTaskName);
  }

  searchNewTask(): void {
    this.router.navigate(['app', 'tasks', this.searchIndex]);
  }

  refreshTasks(): void {
    this.httpService.serachUserId = '';
    this.httpService.getTasksWithNames();
    this.router.navigate(['app', 'tasks']);
  }
  removeData(): void {
    this.router.navigate(['app', 'tasks']);
    this.httpService.tasksSubject.next([]);
  }
}
