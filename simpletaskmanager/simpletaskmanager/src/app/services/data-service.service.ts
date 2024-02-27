import { Injectable } from '@angular/core';
import { idModyf, lskey, Task } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Task[] = [];

  constructor() {
    this.data = this.getData();
  }

  addTask(str: string): void {
    let newTask = this.generateTask(str);
    this.data = this.getData();
    this.data.push(newTask);
    localStorage.setItem(`${lskey}`, JSON.stringify(this.data));
  }

  getData(): Task[] {
    this.data = [];
    let dataReseaved = localStorage.getItem(`${lskey}`);
    if (dataReseaved) {
      this.data = JSON.parse(dataReseaved);
    }
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

  removeTask(data: Task[]): void {
    localStorage.setItem(`${lskey}`, JSON.stringify(data));
  }

  updateTask(updateId: number, updateStr: string): void {
    let updTaskInd = this.data.indexOf(
      this.data.find((el) => el.id === updateId) as Task,
    );
    let updTask: Task = {
      id: this.data[updTaskInd].id,
      title: updateStr,
      status: this.data[updTaskInd].status,
    };
    this.data[updTaskInd] = updTask;
    localStorage.setItem(`${lskey}`, JSON.stringify(this.data));
  }

  updateDataStatus(task: Task): void {
    let updTaskInd = this.data.indexOf(
      this.data.find((el) => el.id === task.id) as Task,
    );
    this.data[updTaskInd] = task;
    localStorage.setItem(`${lskey}`, JSON.stringify(this.data));
    this.data = this.getData();
  }

  clearData(): void {
    this.data = [];
    localStorage.removeItem(`${lskey}`);
  }
}
