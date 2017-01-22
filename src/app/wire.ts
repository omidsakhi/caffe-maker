import { EventEmitter, Output } from '@angular/core';
import { Terminal } from './terminal'
import { Vec } from './vec'

export class Wire {

    @Output() positionChange: EventEmitter<any> = new EventEmitter();
    
    public pi : Vec;
    public po : Vec;

    public output: Terminal = null; // output is the input terminal of a node

    constructor(
        public input: Terminal // input is the output terminal of a node
    ) {        
        this.pi = this.input?this.input.node.pos.add(this.input.pos).add(this.input.size.scale(0.5)):new Vec();
        this.po = this.pi;
        
    }

    setOutputTerminal(t : Terminal) {
        this.output = t;
        this.recalculatePosition();
    }
    setInputTerminal(t : Terminal) {
        this.input = t;
        this.recalculatePosition();
    }
    recalculatePosition() {        
        this.pi = this.input?this.input.node.pos.add(this.input.pos).add(this.input.size.scale(0.5)):this.pi;
        this.po = this.output?this.output.node.pos.add(this.output.pos).add(this.output.size.scale(0.5)):this.po;              
        this.positionChange.emit();
    }
    setInputPoint(p: Vec) {
        this.pi = p;
        this.positionChange.emit();
    }

    setOutputPoint(p : Vec) {
        this.po = p;
        this.positionChange.emit();
    }

}
