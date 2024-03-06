import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { idModyf, lskey, QueryStatus, Task, UrlIdAtr } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Task[] = [];

  constructor() {
    this.data = this.getData();
  }
  dataSubj = new BehaviorSubject<Task[]>(this.data);
  addTask(str: string): void {
    let newTask = this.generateTask(str);
    this.data = this.getData();
    this.data.push(newTask);
    localStorage.setItem(`${lskey}`, JSON.stringify(this.data));
    this.dataSubj.next(this.data);
  }

  getData(): Task[] {
    this.data = [];
    let dataReseaved = localStorage.getItem(`${lskey}`);
    if (dataReseaved) {
      this.data = JSON.parse(dataReseaved);
    }
    this.dataSubj.next(this.data);
    return this.data;
  }

  generateTask(str: string): Task {
    let taskToAdd: Task;
    if (this.data.length) {
      let lastTask = this.data[this.data.length - idModyf.next];
      taskToAdd = {
        id: lastTask.id + idModyf.next,
        title: str,
        status: false,
      };
    } else {
      taskToAdd = {
        id: idModyf.next,
        title: str,
        status: false,
      };
    }
    return taskToAdd;
  }

  removeTask(id: number): void {
    this.data = this.data.filter((el) => el.id !== id);
    localStorage.setItem(`${lskey}`, JSON.stringify(this.data));
  }

  updateTask(updateId: number, updateStr: string): void {
    let curData = this.getData();
    let updTask = curData.find((el) => el.id === updateId) as Task;
    updTask.title = updateStr;
    localStorage.setItem(`${lskey}`, JSON.stringify(curData));
  }

  updateDataStatus(task: Task): void {
    let updTaskInd = this.data.indexOf(
      this.data.find((el) => el.id === task.id) as Task
    );
    this.data[updTaskInd] = task;
    localStorage.setItem(`${lskey}`, JSON.stringify(this.data));
    this.data = this.getData();
  }

  clearData(): void {
    this.data = [];
    localStorage.removeItem(`${lskey}`);
    this.dataSubj.next(this.data);
  }

  searchById(id: string): void {
    this.getData();
    const searchTask = this.data.find((el) => el.id === Number(id));
    if (searchTask) {
      this.data = [searchTask];
    } else {
      this.data = [];
    }
    console.log(this.data);
    this.dataSubj.next(this.data);
  }

  sortByStatus(query: QueryStatus): void {
    if (query.status === 'true') {
      this.data = this.data.sort((a) => {
        if (a.status) {
          return -1;
        }
        return 1;
      });
    }
    if (query.status === 'false') {
      this.data = this.data.sort((a) => {
        if (a.status) {
          return 1;
        }
        return -1;
      });
    }
  }
}
