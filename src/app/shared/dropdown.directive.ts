import {Directive, DoCheck, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements DoCheck{
  @HostBinding('class.show') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef,private _renderer:Renderer2) {}
  //we can use directive only on host element and hence we use ngDoCheck here and rendere2 to add class to nested element .dropdown-menu
  ngDoCheck() {
    const elem = this.elRef.nativeElement.querySelector(".dropdown-menu");
    if (this.isOpen) {
      this._renderer.addClass(elem, "show");  
    } else {
      this._renderer.removeClass(elem, "show");
    }
  }

}