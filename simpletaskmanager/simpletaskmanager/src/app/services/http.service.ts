import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, last, map, Observable } from 'rxjs';
import { QueryStatus, Task, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
    this.getTasksWithNames();
    this.getUsers();
  }
  private tasksUrl = 'https://jsonplaceholder.typicode.com/todos/';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users/';
  public tasks: Task[] = [];
  public users: User[] = [];
  public serachUserId: string = '';
  public tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    this.tasks
  );
  public usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    this.users
  );
  getTasks(): void {
    this.http.get<Task[]>(this.tasksUrl).subscribe((tasks) => {
      this.tasks = tasks;
      this.tasksSubject.next(tasks);
    });
  }
  getUsers(): void {
    this.http.get<User[]>(this.usersUrl).subscribe((users) => {
      this.users = users;
      this.usersSubject.next(users);
    });
  }
  addTask(str: string): void {
    this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(
        map((tasks) => {
          let lastTask = tasks[tasks.length - 1];
          lastTask.id = lastTask.id + 1;
          lastTask.title = str;
          return lastTask;
        })
      )
      .subscribe((lastTask) =>
        this.http.post(this.tasksUrl, lastTask).subscribe(console.log)
      );
  }
  updateTask(updateId: number, updateStr: string): void {
    this.http
      .patch(`${this.tasksUrl}${updateId}`, { title: updateStr })
      .subscribe(() => console.log('Task updated'));
  }
  updateDataStatus(task: Task) {
    this.http
      .patch(`${this.tasksUrl}${task.id}`, { completed: task.completed })
      .subscribe(() => console.log('Task status updated'));
  }
  forkJoinTaskWithNames() {
    return forkJoin({
      tasks: this.http.get<Task[]>(this.tasksUrl),
      users: this.http.get<User[]>(this.usersUrl),
    }).pipe(
      map(({ users, tasks }) => {
        tasks.forEach((task) => {
          const responsibleUser = users.find((user) => user.id === task.userId);
          if (responsibleUser) {
            task.user = responsibleUser;
          }
        });
        if (this.serachUserId) {
          console.log(this.serachUserId);
          return tasks.filter(
            (task) => task.userId === Number(this.serachUserId)
          );
        } else {
          return tasks;
        }
      })
    );
  }
  getTasksWithNames(): void {
    this.forkJoinTaskWithNames().subscribe((tasksWithNames) => {
      this.tasks = tasksWithNames;
      this.tasksSubject.next(tasksWithNames);
    });
  }

  removeTask(id: number): void {
    this.http
      .delete(`${this.tasksUrl}${id}`)
      .subscribe(() => console.log('Task deleted'));
    this.tasksSubject.next(this.tasks.filter((t) => t.id !== id));
  }

  getTaskByID(id: string) {
    forkJoin({
      task: this.http.get<Task>(`${this.tasksUrl}${id}`),
      users: this.http.get<User[]>(this.usersUrl),
    })
      .pipe(
        map(({ task, users }) => {
          const responsibleUser = users.find((user) => user.id === task.userId);
          if (responsibleUser) {
            task.user = responsibleUser;
          }
          return task;
        })
      )
      .subscribe((taskWithName) => {
        this.tasks = [taskWithName];
        this.tasksSubject.next([taskWithName]);
      });
  }
  sortTasksByStatus(query: QueryStatus) {
    this.forkJoinTaskWithNames()
      .pipe(
        map((tasksForSort) => {
          let res = this.tasks;
          if (query.status === 'true') {
            res = tasksForSort.sort((a) => {
              if (a.completed) {
                return -1;
              }
              return 1;
            });
          }
          if (query.status === 'false') {
            res = tasksForSort.sort((a) => {
              if (a.completed) {
                return 1;
              }
              return -1;
            });
          }
          return res;
        })
      )
      .subscribe((sortedByStatus) => {
        this.tasks = sortedByStatus;
        this.tasksSubject.next(sortedByStatus);
      });
  }

  getTasksByTitle(title: string) {
    this.forkJoinTaskWithNames()
      .pipe(
        map((tasks) => {
          return tasks.filter((task) =>
            task.title.toLowerCase().startsWith(title.toLowerCase())
          );
        })
      )
      .subscribe((tasksNew) => {
        this.tasks = tasksNew;
        this.tasksSubject.next(tasksNew);
      });
  }
}
