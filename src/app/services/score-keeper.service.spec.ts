import { TestBed } from '@angular/core/testing';

import { ScoreKeeperService } from './score-keeper.service';

describe('ScoreKeeperService', () => {
  let service: ScoreKeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreKeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
