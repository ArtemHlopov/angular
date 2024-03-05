import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEdRemBtn]',
  standalone: true,
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
      console.log('тут', input, this.elRef.nativeElement.textContent);
    } else {
      this.elRef.nativeElement.textContent = 'edit';
      this.renderer.addClass(this.elRef.nativeElement, 'editMode');
      input.setAttribute('disabled', 'disabled');
    }
  }
}
