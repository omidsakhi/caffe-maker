import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NodeComponent } from '../node/node.component'
import { Vec } from '../vec'
import { LayerParameter } from '../layer-parameter'

@Component({
  selector: 'app-property-widget',
  templateUrl: './property-widget.component.html',
  styleUrls: ['./property-widget.component.css']
})
export class PropertyWidgetComponent implements OnInit {

  @Input() nodeComponent: NodeComponent;
  @Output() closeRequest: EventEmitter<any> = new EventEmitter();

  public pos: Vec;
  public params: LayerParameter;

  constructor() { }

  ngOnInit() {
    this.pos = this.nodeComponent.pos.add(new Vec(50, 50));
    this.params = this.nodeComponent.descriptor.parameters;
  }

  close() {
    this.closeRequest.emit();
  }

  onPropertyWidgetMouseDown(e: MouseEvent) {
    e.stopPropagation();
  }

}
