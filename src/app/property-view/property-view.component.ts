import { Component, OnInit, Input } from '@angular/core';
import { Property , PropertyType } from '../layer-parameter'

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css']
})
export class PropertyViewComponent implements OnInit {
  
  @Input() property : Property;

  constructor() { }

  ngOnInit() {
  }

  isNumber() {
    return (this.property.type == PropertyType.float || this.property.type == PropertyType.int32 || this.property.type == PropertyType.int64 || this.property.type == PropertyType.uint32);
  }
  hasMinimum() {
    return this.property.type == PropertyType.uint32;
  }
  minimum() {
    return 0;
  }
  isText() {
    return (this.property.type == PropertyType.string);
  }
  isOption() {
    return (this.property.type == PropertyType.options);
  }

  isBool() {
    return this.property.type == PropertyType.bool;
  }

  placeHolder() : string{
    switch(this.property.type)
    {
      case PropertyType.bool:
        return "bool";
      case PropertyType.float:
        return "float";
      case PropertyType.int32:
        return "int32";
      case PropertyType.int64:
        return "int64";
      case PropertyType.string:
        return "string";
      case PropertyType.uint32:
      return "uint32";
    }
    return "";
  }

}
