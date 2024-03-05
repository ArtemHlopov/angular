import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { DataService } from '../../services/data-service.service';
import { QueryStatus, Task, UrlIdAtr } from '../../types';
import {
  faSquare,
  faCheckSquare,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html',
  styleUrl: './mainboard.component.scss',
})
export class MainboardComponent implements OnInit {
  constructor(
    public data: DataService,
    library: FaIconLibrary,
    private router: ActivatedRoute,
    private rout: Router
  ) {
    library.addIcons(faSquare, faCheckSquare, faXmark, faCheck);
  }

  sorted: boolean = false;

  tasks: Task[] = [];

  taskForChange: Task = {
    id: 0,
    title: '',
  };

  ngOnInit(): void {
    this.updateData();
    this.router.params.subscribe((p) => {
      if (Object.keys(p).length > 0) {
        let current = p as UrlIdAtr;
        this.data.searchById(current.id);
        this.tasks = this.data.data;
      }
    });
    this.router.queryParams.subscribe((p) => {
      let query = p as QueryStatus;
      this.data.sortByStatus(query);
    });
    const taskSub = this.data.dataSubj.subscribe((d) => (this.tasks = d));
  }

  updateData(): void {
    this.tasks = this.data.getData();
  }

  deleteTask(id: number): void {
    this.data.removeTask(id);
    this.updateData();
  }

  changeStatus(task: Task): void {
    task.status = !task.status;
    this.data.updateDataStatus(task);
  }

  // filterTask(e: string): void {
  //   this.data.searchById(e);
  //   this.tasks = this.data.data;
  // }

  // clearBoard(): void {
  //   this.tasks = [];
  // }

  upadateTask(updTaskId: number, newText: string) {
    this.data.updateTask(updTaskId, newText);
  }

  sortBystatus(): void {
    this.sorted = !this.sorted;
    this.rout.navigate([], {
      queryParams: { status: this.sorted },
    });
  }
}
