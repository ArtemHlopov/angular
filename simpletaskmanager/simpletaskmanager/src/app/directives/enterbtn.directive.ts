import { Directive, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appEnterbtn]',
  standalone: true,
})
export class EnterbtnDirective {
  constructor(private elRef: ElementRef, private authService: AuthService) {}

  @HostListener('click', ['$event'])
  onclick(): void {
    if (this.authService.auth) {
      this.elRef.nativeElement.textContent = 'Enter';
    } else {
      this.elRef.nativeElement.textContent = 'Logout';
    }
    console.log(this.authService.auth);
  }
}
