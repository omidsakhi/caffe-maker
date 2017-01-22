/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WireComponent } from './wire.component';

describe('WireComponent', () => {
  let component: WireComponent;
  let fixture: ComponentFixture<WireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
