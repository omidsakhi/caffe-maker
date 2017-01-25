import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dialogRef: MdDialogRef<any>;
  @Output() sendPrototxtToUser : EventEmitter<any> = new EventEmitter;
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  onAbout() {
    let dialogRef = this.dialog.open(AboutDialogComponent);
    console.log(dialogRef);
  }

  onDownloadPrototxt() {
    this.sendPrototxtToUser.emit();
  }
}
