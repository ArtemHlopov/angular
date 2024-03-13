import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { HttpService } from '../services/http.service';

@Directive({
  selector: '[appEdRemBtn]',
  standalone: true,
})
export class EditRemovebtn {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private httpService: HttpService
  ) {}

  @HostListener('click', ['$event'])
  onClick(): void {
    let input = this.elRef.nativeElement.parentElement.previousElementSibling
      .previousElementSibling as HTMLInputElement;
    let idBlock = input.parentElement as HTMLElement;
    let id = idBlock.id;
    if (this.elRef.nativeElement.classList.contains('editMode')) {
      this.elRef.nativeElement.classList.remove('editMode');
      this.elRef.nativeElement.textContent = 'save';
      input.removeAttribute('disabled');
    } else {
      this.elRef.nativeElement.classList.add('editMode');
      this.elRef.nativeElement.textContent = 'edit';
      this.httpService.updateTask(Number(id), input.value);
      input.setAttribute('disabled', 'disabled');
    }
  }
}
