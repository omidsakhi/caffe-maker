import { Directive, OnInit, OnDestroy, Renderer, ElementRef, Output, EventEmitter } from '@angular/core';
import { Vec } from './vec'

@Directive({
  selector: '[draggable]',
  host: {
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(drag)': 'onDrag($event)'
  }
})

export class DraggableDirective implements OnInit, OnDestroy {
  @Output() positionChange: EventEmitter<Vec> = new EventEmitter();

  private mouseOffset: Vec = new Vec();

  constructor(private el: ElementRef, private renderer: Renderer) { }

  public ngOnInit(): void {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'true');
  }

  onDragStart(event: MouseEvent) {
    this.mouseOffset = new Vec(event.x - this.el.nativeElement.offsetLeft, event.y - this.el.nativeElement.offsetTop);
  }

  onDrag(event: MouseEvent) {
    this.translate(new Vec(event.x, event.y));    
  }

  onDragEnd(event: MouseEvent) {    
    this.mouseOffset = new Vec();     
  }

  translate(vec: Vec) {
    if (!vec.x || !vec.y) return;    
    this.renderer.setElementStyle(this.el.nativeElement, 'top', (vec.y - this.mouseOffset.y) + 'px');
    this.renderer.setElementStyle(this.el.nativeElement, 'left', (vec.x - this.mouseOffset.x) + 'px');
    this.positionChange.emit(new Vec((vec.x - this.mouseOffset.x),(vec.y - this.mouseOffset.y)));
  }

  public ngOnDestroy(): void {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'false');
  }

}
