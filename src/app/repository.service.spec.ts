/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RepositoryService } from './repository.service';

describe('RepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryService]
    });
  });

  it('should ...', inject([RepositoryService], (service: RepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
