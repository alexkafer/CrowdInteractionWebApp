import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[appModeDisplay]'
})
export class ModeDisplayDirective {

  constructor(public viewContainerRef: ViewContainerRef, el: ElementRef) {}

}
