import { Directive, ElementRef, HostListener } from '@angular/core';
import { HttpService } from '../services/http.service';

@Directive({
  selector: '[appSelect]',
  standalone: true,
})
export class SelectDirective {
  constructor(private elRef: ElementRef, private httpService: HttpService) {}

  @HostListener('change')
  onChange() {
    console.log(this.elRef.nativeElement.value);
    this.httpService.serachUserId = this.elRef.nativeElement.value;
    this.httpService.getTasksWithNames();
  }
}
