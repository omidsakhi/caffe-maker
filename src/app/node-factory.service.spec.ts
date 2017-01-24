/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodeFactoryService } from './node-factory.service';

describe('NodeFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeFactoryService]
    });
  });

  it('should ...', inject([NodeFactoryService], (service: NodeFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
