import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { DataService } from '../../services/data-service.service';
import { QueryStatus, Task, UrlIdAtr, User } from '../../types';
import {
  faSquare,
  faCheckSquare,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html',
  styleUrl: './mainboard.component.scss',
})
export class MainboardComponent implements OnInit {
  constructor(
    public httpService: HttpService,
    public data: DataService,
    library: FaIconLibrary,
    private router: ActivatedRoute,
    private rout: Router
  ) {
    library.addIcons(faSquare, faCheckSquare, faXmark, faCheck);
  }

  sorted: boolean = false;

  tasks: Task[] = [];
  users: User[] = [];
  taskForChange: Task = {
    id: 0,
    title: '',
    completed: false,
  };

  ngOnInit(): void {
    this.httpService.tasksSubject.subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks);
    });
    this.httpService.usersSubject.subscribe((users) => {
      this.users = users;
      console.log(users);
    });
    this.router.params.subscribe((p) => {
      if (Object.keys(p).length > 0) {
        let current = p as UrlIdAtr;
        this.httpService.getTaskByID(current.id);
      }
    });
    this.router.queryParams.subscribe((p) => {
      let query = p as QueryStatus;
      this.httpService.sortTasksByStatus(query);
    });
  }

  deleteTask(id: number): void {
    this.httpService.removeTask(id);
  }

  changeStatus(task: Task): void {
    task.completed = !task.completed;
    this.data.updateDataStatus(task);
  }

  sortBystatus(): void {
    this.sorted = !this.sorted;
    this.rout.navigate([], {
      queryParams: { status: this.sorted },
    });
  }
}
