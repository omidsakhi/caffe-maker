export class Vec {

    constructor(
    public x: number = 0,
    public y: number = 0,
    ){}

    abs() : Vec { return new Vec(Math.abs(this.x),Math.abs(this.y)); }    
    distance(v:Vec) : number {return Math.sqrt(Math.pow(this.x-v.x,2) + Math.pow(this.y-v.y,2));}
    length() : number {return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));}
    add(v:Vec) : Vec { return new Vec(this.x + v.x, this.y + v.y); }
    sub(v:Vec) : Vec { return new Vec(this.x - v.x, this.y - v.y); }        
    rotate(a:number): Vec { return new Vec(this.x * Math.cos(a) + this.y * Math.sin(a),-this.x * Math.sin(a) + this.y * Math.cos(a));}    
    scale(s:number) : Vec { return new Vec(this.x * s,this.y * s); }
    normalize() : Vec { return this.scale(1.0/this.length()); }
    max(v:Vec) { return new Vec(Math.max(this.x,v.x),Math.max(this.y,v.y));}
    min(v:Vec) { return new Vec(Math.min(this.x,v.x),Math.min(this.y,v.y));}
}
