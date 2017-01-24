import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { NodeDescriptor } from '../node-descriptor'
import { Terminal, TerminalType } from '../terminal'
import { Wire } from '../wire'
import { Vec } from '../vec'

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() nodeIndex: number;
  @Input() descriptor: NodeDescriptor;
  @Output() removeWire: EventEmitter<Wire> = new EventEmitter();
  @Output() inputTerminalMouseUp: EventEmitter<Terminal> = new EventEmitter();
  @Output() outputTerminalMouseUp: EventEmitter<Terminal> = new EventEmitter();
  @Output() inputTerminalMouseDown: EventEmitter<Terminal> = new EventEmitter();
  @Output() outputTerminalMouseDown: EventEmitter<Terminal> = new EventEmitter();
  @Output() requestPropertyWidget: EventEmitter<NodeComponent> = new EventEmitter();

  public name: string;
  public nodeSize: Vec = new Vec(200, 250);
  public terminalSize: Vec = new Vec(15, 20);
  public nameSize: Vec = new Vec(196, 35);
  public typeSize: Vec = new Vec(196, 25);
  public terminalGapY: number = 10;
  public pos: Vec = new Vec();
  public inputs: Terminal[] = [];
  public outputs: Terminal[] = [];
  public isSelected: boolean = false;  

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  createTerminals() {
    var minNumInputs = (this.descriptor.minNumInputs == -1) ? 0 : this.descriptor.minNumInputs;
    var minNumOutputs = (this.descriptor.minNumOutputs == -1) ? 0 : this.descriptor.minNumOutputs;
    var numInputs = (this.descriptor.exactNumInputs != -1) ? this.descriptor.exactNumInputs : minNumInputs;
    var numOutputs = (this.descriptor.exactNumOutputs != -1) ? this.descriptor.exactNumOutputs : minNumOutputs;
    for (var i = 0; i < numInputs; ++i)
      this.addIndexedInputTerminal(i);
    for (var i = 0; i < numOutputs; ++i)
      this.addIndexedOutputTerminal(i);
    this.recalcNodeHeight();
  }

  recalcNodeHeight() {
    var t = this.inputs.length > this.outputs.length ? this.inputs[this.inputs.length - 1] : this.outputs[this.outputs.length - 1];
    if (t)
      this.nodeSize.y = t.pos.y + this.terminalGapY * 1.5 + this.terminalSize.y;
    else
      this.nodeSize.y = this.terminalGapY * 1.5 + this.typeSize.y;
  }

  addIndexedInputTerminal(indx: number) {
    var pos = new Vec();
    pos.x = -2;
    pos.y = this.nameSize.y + this.typeSize.y + this.terminalGapY + indx * (this.terminalGapY + this.terminalSize.y);
    this.inputs.push(new Terminal(this, TerminalType.Input, indx, pos, this.terminalSize));
  }

  addIndexedOutputTerminal(indx: number) {
    var pos = new Vec();
    pos.x = this.nodeSize.x - this.terminalSize.x - 2; // removing the border size
    pos.y = this.nameSize.y + this.typeSize.y + this.terminalGapY + indx * (this.terminalGapY + this.terminalSize.y);
    this.outputs.push(new Terminal(this, TerminalType.Output, indx, pos, this.terminalSize));
  }

  canAddOrRemoveInputTerminal(): boolean {
    return this.descriptor.exactNumInputs == -1;
  }
  canAddOrRemoveOutputTerminal(): boolean {
    return this.descriptor.exactNumOutputs == -1;
  }
  canAddInputTerminal(): boolean {
    return this.descriptor.exactNumInputs == -1 && ((this.descriptor.maxNumInputs != -1 && this.inputs.length < this.descriptor.maxNumInputs) || this.descriptor.maxNumInputs == -1);
  }
  canRemoveInputTerminal(): boolean {
    return this.descriptor.exactNumInputs == -1 && (this.inputs.length > this.descriptor.minNumInputs);
  }
  canAddOutputTerminal(): boolean {
    return this.descriptor.exactNumOutputs == -1 && ((this.descriptor.maxNumOutputs != -1 && this.outputs.length < this.descriptor.maxNumOutputs) || this.descriptor.maxNumOutputs == -1);
  }
  canRemoveOutputTerminal(): boolean {
    return this.descriptor.exactNumOutputs == -1 && (this.outputs.length > this.descriptor.minNumOutputs);
  }
  addInputTerminal($event: Event) {
    this.addIndexedInputTerminal(this.inputs.length);
    this.recalcNodeHeight();
    $event.stopPropagation();
    $event.preventDefault();
  }

  addOutputTerminal($event: Event) {
    this.addIndexedOutputTerminal(this.outputs.length);
    this.recalcNodeHeight();
    $event.stopPropagation();
    $event.preventDefault();
  }

  removeInputTerminal($event) {
    var t = this.inputs[this.inputs.length - 1];
    if (t.wire) this.removeWire.emit(t.wire);
    this.inputs.splice(this.inputs.length - 1, 1);
    this.recalcNodeHeight();
    $event.stopPropagation();
    $event.preventDefault();
  }

  removeOutputTerminal($event) {
    var t = this.outputs[this.outputs.length - 1];
    if (t.wire) this.removeWire.emit(t.wire);
    this.outputs.splice(this.outputs.length - 1, 1);
    this.recalcNodeHeight();
    $event.stopPropagation();
    $event.preventDefault();
  }

  ngOnInit() {    
    this.pos = this.descriptor.pos;
    this.name = this.descriptor.type + "_" + (this.nodeIndex + 1);
    this.createTerminals();
  }

  onPositionChange($event) {
    this.pos = $event;
    for (let t of this.inputs)
      if (t.wire) t.wire.recalculatePosition();
    for (let t of this.outputs)
      if (t.wire) t.wire.recalculatePosition();
  }

  borderColor(): string {
    return this.isSelected ? 'rgb(200,139,63)' : 'rgb(38,38,38)';
  }

  onInputTerminalMouseDown(e: Event, t: Terminal) {
    e.preventDefault();
    e.stopPropagation();
    this.inputTerminalMouseDown.emit(t);
  }

  onInputTerminalMouseUp(e: Event, t: Terminal) {
    e.preventDefault();
    e.stopPropagation();
    this.inputTerminalMouseUp.emit(t);
  }

  onOutputTerminalMouseDown(e: Event, t: Terminal) {
    e.preventDefault();
    e.stopPropagation();
    this.outputTerminalMouseDown.emit(t);
  }

  onOutputTerminalMouseUp(e: Event, t: Terminal) {
    e.preventDefault();
    e.stopPropagation();
    this.outputTerminalMouseUp.emit(t);
  }

  onNodeMouseDown(e : MouseEvent) {    
      this.requestPropertyWidget.emit(this);
      this.isSelected = this.isSelected == true ? false : true;
  }
}
