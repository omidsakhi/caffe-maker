import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prototxt-view',
  templateUrl: './prototxt-view.component.html',
  styleUrls: ['./prototxt-view.component.css']
})
export class PrototxtViewComponent implements OnInit {
  public protoTxt: string = "";
  constructor() { }

  ngOnInit() {
  }

  openFileDialog(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
  }

  download() {
    this.openFileDialog("network.prototxt", this.protoTxt);
  }
}
