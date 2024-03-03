import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

import { DataService } from '../services/data-service.service';

@Directive({
  selector: '[appEdRemBtn]',
  standalone: true,
  providers: [DataService],
})
export class EditRemovebtn {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(): void {
    let input = this.elRef.nativeElement.parentElement.previousElementSibling
      .previousElementSibling as HTMLInputElement;
    if (this.elRef.nativeElement.classList.contains('editMode')) {
      this.elRef.nativeElement.textContent = 'save';
      this.renderer.removeClass(this.elRef.nativeElement, 'editMode');
      input.removeAttribute('disabled');
      console.log('тут', input);
    } else {
      this.elRef.nativeElement.textContent = 'edit';
      this.renderer.addClass(this.elRef.nativeElement, 'editMode');
      input.setAttribute('disabled', 'disabled');
    }
  }
}
