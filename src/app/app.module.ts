import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WireComponent } from './wire/wire.component';
import { SceneComponent } from './scene/scene.component';
import { RepositoryService } from './repository.service';
import { DraggableDirective } from './draggable.directive';
import { CaffeBuffetComponent } from './caffe-buffet/caffe-buffet.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,    
    NavbarComponent,
    WireComponent,
    SceneComponent,
    DraggableDirective,
    CaffeBuffetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule    
  ],
  providers: [
    RepositoryService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
