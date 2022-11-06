import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numberOnly]',
})
export class NumberOnlyDirective {
  constructor(private _el: ElementRef) {}

  @HostListener('input') onInputChange() {
    const inputValue = this._el.nativeElement.value;
    this._el.nativeElement.value = inputValue.replace(/[^0-9]*/g, '');
  }
}
