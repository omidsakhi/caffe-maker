import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NodeFactoryService } from '../node-factory.service'
import { NodeDescriptor } from '../node-descriptor'

@Component({
  selector: 'app-caffe-buffet',
  templateUrl: './caffe-buffet.component.html',
  styleUrls: ['./caffe-buffet.component.css']
})

export class CaffeBuffetComponent implements OnInit {  
  @ViewChild('outer') private outerContent: ElementRef;
  
  private timer : any = null;
  
  constructor(public factory: NodeFactoryService) { 

  }

  ngOnInit() {

  }

  onDragStart($event,node : string) {    
    $event.dataTransfer.effectAllowed = 'move';
    $event.dataTransfer.setData("text",JSON.stringify({"node":node,"src":"buffet"}));
  }

  startScrollRight() {
    this.timer = setInterval(()=> {
      this.outerContent.nativeElement.scrollLeft += 2;
    },5);
  }

  startScrollLeft() {
    this.timer = setInterval(()=> {      
      this.outerContent.nativeElement.scrollLeft -= 2;    
    },5);
  }

  stopScroll() {
    clearInterval(this.timer);
  }

  scrollLeft() {
    this.outerContent.nativeElement.scrollLeft = 0;
  }

  scrollRight() {
    this.outerContent.nativeElement.scrollLeft = this.outerContent.nativeElement.scrollWidth;
  }

}
