import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Wire } from '../wire'
import { Vec } from '../vec'

@Component({
  selector: 'wire',
  templateUrl: './wire.component.html',
  styleUrls: ['./wire.component.css']
})
export class WireComponent implements OnInit {

  @Input() wire: Wire;  

  @ViewChild("canvas") canvas: ElementRef;
  public context: CanvasRenderingContext2D;

  public pos: Vec = new Vec(0, 0);
  public size: Vec = new Vec(0, 0);

  constructor() { }

  ngOnInit() {
    this.wire.positionChange.subscribe(() => this.draw());
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext("2d");    
    setTimeout(()=>{
      this.draw();
    })
  }

  draw() {

    this.context.clearRect(0, 0, this.size.x, this.size.y);
    var start = this.wire.pi;
    var end = this.wire.po;
    var diff = end.sub(start);
    var d = diff.length() / 2;
    var ctrl1 = new Vec(start.x + d, start.y);
    var ctrl2 = new Vec(end.x - d, end.y);

    this.pos = start.min(end.min(ctrl1.min(ctrl2)));
    this.size = start.max(end.max(ctrl1.max(ctrl2))).sub(this.pos);
    this.canvas.nativeElement.width = this.size.x;
    this.canvas.nativeElement.height = this.size.y;

    this.context.beginPath();
    this.context.moveTo(start.x - this.pos.x, start.y - this.pos.y);
    this.context.bezierCurveTo(ctrl1.x - this.pos.x, ctrl1.y - this.pos.y, ctrl2.x - this.pos.x, ctrl2.y - this.pos.y, end.x - this.pos.x, end.y - this.pos.y);
    this.context.strokeStyle = "rgb(200,139,63)";
    this.context.lineWidth = 2;
    this.context.stroke();

  }
}
