import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

import { DataService } from '../services/data-service.service';

@Directive({
  selector: '[appEdRemBtn]',
  standalone: true,
  providers: [DataService],
})
export class EditRemovebtn {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private dataService: DataService
  ) {}

  @HostListener('click', ['$event'])
  onClick(): void {
    let input =
      this.elRef.nativeElement.parentElement.previousElementSibling
        .previousElementSibling;
    if (this.elRef.nativeElement.classList.contains('editMode')) {
      this.elRef.nativeElement.textContent = 'save';
      this.elRef.nativeElement.classList.toggle('editMode');
      input.removeAttribute('disabled');
    } else {
      this.elRef.nativeElement.textContent = 'edit';
      this.elRef.nativeElement.classList.toggle('editMode');
      input.setAttribute('disabled', 'disabled');
    }
  }
}
