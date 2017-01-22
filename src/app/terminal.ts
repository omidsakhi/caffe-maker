import { Wire } from './wire'
import { NodeComponent } from './node/node.component'
import { Vec } from './vec'

export enum TerminalType {
    Input,
    Output
}

export class Terminal {
    public wire: Wire = null;

    constructor(
        public node: NodeComponent,
        public type: TerminalType,
        public index: number,
        public pos: Vec,
        public size: Vec    
    ) {}

}
