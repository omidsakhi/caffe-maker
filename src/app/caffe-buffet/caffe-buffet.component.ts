import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service'
import { NodeDescriptor } from '../node-descriptor'

@Component({
  selector: 'app-caffe-buffet',
  templateUrl: './caffe-buffet.component.html',
  styleUrls: ['./caffe-buffet.component.css']
})

export class CaffeBuffetComponent implements OnInit {  
  
  constructor(public repo: RepositoryService) { 

  }

  ngOnInit() {

  }

  onDragStart($event,node : NodeDescriptor) {    
    $event.dataTransfer.effectAllowed = 'move';
    $event.dataTransfer.setData("text",JSON.stringify({"id":node.id,"src":"buffet"}));      
  }

}
