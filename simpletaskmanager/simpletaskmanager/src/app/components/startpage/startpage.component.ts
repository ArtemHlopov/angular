import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.scss',
})
export class StartpageComponent implements OnInit {
  public status: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  enterApp(): void {
    if (!this.auth.auth) {
      this.auth.enter();
      this.router.navigate(['app', 'tasks']);
    } else {
      this.auth.logout();
      this.router.navigate(['app']);
    }
    console.log(this.auth.auth);
  }
}
