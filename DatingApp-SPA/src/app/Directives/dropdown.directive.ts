import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown',
})
export class DropdownDirective {
  // @HostBinding('class.open') isOpen = false;
  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen() {
    // this.isOpen = !this.isOpen;
    console.log(event.target);
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
  @HostBinding('class.open') isOpen = false;
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }
}
