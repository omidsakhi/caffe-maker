import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RepositoryService } from '../repository.service'
import { NodeDescriptor } from '../node-descriptor'

@Component({
  selector: 'app-caffe-buffet',
  templateUrl: './caffe-buffet.component.html',
  styleUrls: ['./caffe-buffet.component.css']
})

export class CaffeBuffetComponent implements OnInit {  
  @ViewChild('outer') private outerContent: ElementRef;
  
  private timer : any = null;
  
  constructor(public repo: RepositoryService) { 

  }

  ngOnInit() {

  }

  onDragStart($event,node : NodeDescriptor) {    
    $event.dataTransfer.effectAllowed = 'move';
    $event.dataTransfer.setData("text",JSON.stringify({"id":node.id,"src":"buffet"}));      
  }

  startScrollRight() {
    this.timer = setInterval(()=> {
      this.outerContent.nativeElement.scrollLeft += 1;
    },5);
  }

  startScrollLeft() {
    this.timer = setInterval(()=> {      
      this.outerContent.nativeElement.scrollLeft -= 1;    
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
