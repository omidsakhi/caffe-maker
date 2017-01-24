import { Component, OnInit, Input } from '@angular/core';
import { NodeComponent } from '../node/node.component'
import { Vec } from '../vec'
import { LayerParameter } from '../layer-parameter'

@Component({
  selector: 'app-property-widget',
  templateUrl: './property-widget.component.html',
  styleUrls: ['./property-widget.component.css']
})
export class PropertyWidgetComponent implements OnInit {
  
  @Input() nodeComponent : NodeComponent;
  public pos : Vec ;
  public parameters : LayerParameter;

  constructor() { }

  ngOnInit() {
    this.pos = this.nodeComponent.pos.add(new Vec(50,50));
    this.parameters = this.nodeComponent.descriptor.parameters;
    console.log(this.parameters);
  }

}
