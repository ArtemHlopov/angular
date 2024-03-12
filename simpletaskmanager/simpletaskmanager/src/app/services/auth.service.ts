import { Injectable } from '@angular/core';
import { userLogged } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth: boolean;
  constructor() {
    this.auth = this.checkAuth();
  }

  checkAuth(): boolean {
    let status: string | null = localStorage.getItem('userLog');
    if (status) {
      return userLogged.loggedin;
    }
    return userLogged.loggedout;
  }

  enter(): void {
    localStorage.setItem('userLog', JSON.stringify(userLogged.loggedin));
    this.auth = userLogged.loggedin;
  }

  logout(): void {
    localStorage.removeItem('userLog');
    this.auth = userLogged.loggedout;
  }
}
