import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from '../services/data-service.service';

@Directive({
  selector: '[appEdRemBtn]',
  standalone: true,
})
export class EditRemovebtn {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private service: DataService
  ) {}

  @HostListener('click', ['$event'])
  onClick(): void {
    let input = this.elRef.nativeElement.parentElement.previousElementSibling
      .previousElementSibling as HTMLInputElement;
    let idBlock = input.parentElement as HTMLElement;
    let id = idBlock.id;
    console.log(
      this.elRef.nativeElement.classList.contains('editMode'),
      input,
      this.elRef.nativeElement,
      id
    );
    if (this.elRef.nativeElement.classList.contains('editMode')) {
      this.elRef.nativeElement.classList.remove('editMode');
      this.elRef.nativeElement.textContent = 'save';
      input.removeAttribute('disabled');
      console.log('тут', input, this.elRef.nativeElement.textContent);
    } else {
      this.elRef.nativeElement.classList.add('editMode');
      this.elRef.nativeElement.textContent = 'edit';
      this.service.updateTask(Number(id), input.value);
      input.setAttribute('disabled', 'disabled');
    }
  }
}
