import { Directive, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') HighLightColor: string

  private _defautltColor = 'red'

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'color', this._defautltColor)
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.HighLightColor)
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: Event) {
    this.renderer.setStyle(this.el.nativeElement, 'color', this._defautltColor)
  }

}
