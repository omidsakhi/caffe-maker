import { Vec } from './vec'
import { LayerParameter } from './layer-parameter';

export class NodeDescriptor {    
    public pos: Vec = new Vec();
    constructor(
        public type: string,
        public description: string = "",
        public parameters : LayerParameter,
        public exactNumInputs: number = -1,
        public minNumInputs: number = -1,
        public maxNumInputs: number = -1,
        public exactNumOutputs: number = -1,
        public minNumOutputs: number = -1,
        public maxNumOutputs: number = -1,
        public equalNumInputOutput: boolean = false
    ) {}

}
