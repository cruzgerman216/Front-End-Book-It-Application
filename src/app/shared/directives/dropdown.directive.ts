import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // Inject my elementRef && renderer2 package
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  // When "isOpen" switches to true the "show" class will be added.
  // When "isOpen" is false, the "show" class will be removed.
  @HostBinding('class.show') isOpen = false;

  // Listen for a click and toggle the variable
  @HostListener('click') onToggleOpen() {
    // Change our "isOpen" variable to the opposite of it's current value
    this.isOpen = !this.isOpen;

    // Grab the dropdown-menu div
    let dropdownList =
      this.elementRef.nativeElement.querySelector('.dropdown-menu');

    // Conditional to toggle the "show" class
    if (this.isOpen) {
      // If "isOpen" is true => ADD the class "show" to our dropdownList
      this.renderer.addClass(dropdownList, 'show');
    } else {
      // If "isOpen" is false => REMOVE the class "show" from dropdownList
      this.renderer.removeClass(dropdownList, 'show');
    }
  }
}
