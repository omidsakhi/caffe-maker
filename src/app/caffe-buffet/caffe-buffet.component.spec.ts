/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaffeBuffetComponent } from './caffe-buffet.component';

describe('CaffeBuffetComponent', () => {
  let component: CaffeBuffetComponent;
  let fixture: ComponentFixture<CaffeBuffetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaffeBuffetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaffeBuffetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
