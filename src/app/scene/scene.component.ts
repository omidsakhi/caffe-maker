//import * as protobuf from 'protobufjs'
import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { NodeDescriptor } from '../node-descriptor';
import { NodeFactoryService } from '../node-factory.service'
import { Wire } from '../wire'
import { Vec } from '../vec'
import { Terminal } from '../Terminal'
import { NodeComponent } from '../node/node.component'
import {MdDialog, MdDialogRef} from '@angular/material';
import { PrototxtViewComponent } from '../prototxt-view/prototxt-view.component'

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class SceneComponent implements OnInit, AfterViewInit {

  public wireInCreation: Wire = null;
  public sceneDrag: Vec = null
  public wires: Wire[] = [];
  public nodeDescriptors: NodeDescriptor[] = [];
  public propertyPanels : NodeComponent[] = [];

  //public caffe: protobuf.Root;
  @ViewChildren(NodeComponent) nodes: QueryList<NodeComponent>;

  constructor(public factory: NodeFactoryService, public dialog: MdDialog) { }

  ngOnInit() { 
    //protobuf.load("assets/proto/caffe.proto", (err,root)=> {
      //this.caffe = root;
    //})
  }

  ngAfterViewInit() { }

  handleKeyboardEvents($event: KeyboardEvent) {
    if ($event.key == "x" || $event.key == "X" || $event.keyCode == 46) {
      var indices: number[] = [];
      this.nodes.forEach((n, i) => {
        if (n && n.isSelected == true) {
          for (let t of n.inputs)
            if (t.wire) this.removeWire(t.wire);
          for (let t of n.outputs)
            if (t.wire) this.removeWire(t.wire);
          indices.push(i);
        }
      })
      for (var i = indices.length - 1; i > -1; i--)
        this.nodeDescriptors.splice(indices[i], 1);
    }
    else if ($event.key == "D" || $event.key == "d") {
      this.onDownloadPrototxt();
    }
  }

  onInputTerminalMouseUp(t: Terminal) {
    if (this.wireInCreation) {
      if (t.wire == null && this.wireInCreation.output == null) {
        var wire = this.wireInCreation;
        this.wires.push(wire);
        t.wire = wire;
        wire.setOutputTerminal(t);
        this.wireInCreation = null;
      }
      else {
        this.removeWire(this.wireInCreation);
        this.wireInCreation = null;
      }
    }
  }

  onOutputTerminalMouseUp(t: Terminal) {
    if (this.wireInCreation) {
      if (t.wire == null && this.wireInCreation.input == null) {
        var wire = this.wireInCreation;
        this.wires.push(wire);
        t.wire = wire;
        wire.setInputTerminal(t);
        this.wireInCreation = null;
      }
      else {
        this.removeWire(this.wireInCreation);
        this.wireInCreation = null;
      }
    }
  }

  onInputTerminalMouseDown(t: Terminal) {
    if (t.wire != null) {
      var indx = this.wires.indexOf(t.wire);
      this.wires.splice(indx, 1);
      this.wireInCreation = t.wire;
      this.wireInCreation.output = null;
      t.wire = null;
    }
  }

  onOutputTerminalMouseDown(t: Terminal) {
    if (t.wire == null) {
      this.wireInCreation = new Wire(t);
      t.wire = this.wireInCreation;
    }
    else {
      var indx = this.wires.indexOf(t.wire);
      this.wires.splice(indx, 1);
      this.wireInCreation = t.wire;
      this.wireInCreation.input = null;
      t.wire = null;
    }
  }
  removeWire(wire: Wire) {
    if (wire.input) {
      wire.input.wire = null;
      wire.input = null;
    }
    if (wire.output) {
      wire.output.wire = null;
      wire.output = null;
    }
    var indx = this.wires.indexOf(wire);
    if (indx != -1)
      this.wires.splice(indx, 1);
  }

  onMouseDown($event) {
    if (this.sceneDrag == null)
      this.sceneDrag = new Vec($event.x, $event.y);
  }

  onMouseMove($event) {
    if (this.wireInCreation) {
      if (this.wireInCreation.input == null)
        this.wireInCreation.setInputPoint(new Vec($event.x, $event.y));
      else if (this.wireInCreation.output == null)
        this.wireInCreation.setOutputPoint(new Vec($event.x, $event.y));
    }
    else if (this.sceneDrag) {
      var mousePos = new Vec($event.x, $event.y);
      var diff: Vec = mousePos.sub(this.sceneDrag);
      this.nodes.forEach((n) => {
        if (n) n.pos = n.pos.add(diff);
      })
      this.sceneDrag = mousePos;
    }
  }

  onMouseUp($event) {
    if (this.wireInCreation) {
      this.removeWire(this.wireInCreation);
      this.wireInCreation = null;
    }
    this.sceneDrag = null;
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  onDrop(e) {
    var data = e.dataTransfer.getData("text");
    if (data) {
      var dto = JSON.parse(data);
      if (dto.src == "buffet")
      {
        var descriptor : NodeDescriptor = this.factory.createNode(dto.node);
        descriptor.pos = new Vec(e.x,e.y);
        this.nodeDescriptors.push(descriptor);
      }
    }
  }

  convertNodeToProtoText(nc: NodeComponent, indx: number): string {
    var dc: NodeDescriptor = nc.descriptor;
    var text = "layer {\n";
    text += '  name: "' + nc.name + '"\n';
    text += '  type: "' + dc.type + '"\n';
    for (var i = 0; i < nc.inputs.length; ++i) {
      var wire: Wire = nc.inputs[i].wire;
      if (wire && wire.input && wire.input.node) {
        var nc2 = wire.input.node;
        var indx2 = nc2.outputs.indexOf(wire.input);
        text += '  bottom: "' + nc2.name + "_Output_" + indx2 + '"\n';
      }
    }
    for (var i = 0; i < nc.outputs.length; ++i)
      text += '  top: "' + nc.name + "_Output_" + i + '"\n';    
    text += dc.parameters.toProtoText(0);
    text += "}\n\n";
    return text;
  }

  onDownloadPrototxt() {
    var text: string = "";
    this.nodes.forEach((nc, i) => {
      text += this.convertNodeToProtoText(nc, i);
    })
    let dialogRef = this.dialog.open(PrototxtViewComponent);
    dialogRef.componentInstance.protoTxt = text;
  }
    
  onRequestPropertyWidget($event : NodeComponent) {
    var index = this.propertyPanels.indexOf($event);
    if (index == -1)
    {      
      this.propertyPanels.push($event);    
    }
  }

  onCloseRequest(panel : NodeComponent) {
    var index = this.propertyPanels.indexOf(panel);
    if (index != -1)
      this.propertyPanels.splice(index,1);    
  }
}
