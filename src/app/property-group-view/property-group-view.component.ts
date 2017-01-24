import { Component, OnInit, Input } from '@angular/core';
import { Property, PropertyGroup } from '../layer-parameter'

@Component({
  selector: 'app-property-group-view',
  templateUrl: './property-group-view.component.html',
  styleUrls: ['./property-group-view.component.css']
})
export class PropertyGroupViewComponent implements OnInit {

  @Input() propertyGroup : PropertyGroup;
  constructor() { }

  ngOnInit() {
  }

}
