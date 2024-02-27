import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule],
  providers: [DataService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private dataService: DataService) {}

  @Output() addTask = new EventEmitter();

  @Output() searchTask = new EventEmitter();

  @Output() refreshData = new EventEmitter();

  @Output() removeAllData = new EventEmitter();

  newTaskName: string = '';

  searchIndex: string = '';

  addNewTask(): void {
    this.dataService.addTask(this.newTaskName);
    this.addTask.emit();
  }

  searchNewTask(): void {
    this.searchTask.emit(this.searchIndex);
  }

  refreshTasks(): void {
    this.refreshData.emit();
  }

  removeData(): void {
    this.dataService.data = [];
    this.dataService.clearData();
    this.removeAllData.emit();
  }
}
