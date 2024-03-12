import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { debounce, debounceTime, fromEvent, of, timer } from 'rxjs';
import { HttpService } from '../services/http.service';

@Directive({
  selector: '[appSearchTitle]',
  standalone: true,
})
export class SearchTitleDirective implements OnInit {
  constructor(private elRef: ElementRef, private httpService: HttpService) {}

  ngOnInit(): void {
    fromEvent(this.elRef.nativeElement, 'input')
      .pipe(debounceTime(1000))
      .subscribe(() => {
        const text = this.elRef.nativeElement.value;
        this.httpService.getTasksByTitle(text);
      });
  }
}
