import { TestBed } from '@angular/core/testing';

import { SyncActionsService } from './sync-actions.service';

describe('SyncActionsService', () => {
  let service: SyncActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
