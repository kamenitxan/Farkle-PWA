import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default player names', (done) => {
    service.player1NameObservable.subscribe(name => {
      expect(name).toBe('player1');
      done();
    });
  });

  it('should have default player 2 name', (done) => {
    service.player2NameObservable.subscribe(name => {
      expect(name).toBe('player2');
      done();
    });
  });

  it('should have default target score of 2000', (done) => {
    service.targetScoreObservable.subscribe(score => {
      expect(score).toBe(2000);
      done();
    });
  });

  it('should return target score via getTargetScore', () => {
    expect(service.getTargetScore()).toBe(2000);
  });

  it('should update player names', (done) => {
    const newPlayer1 = 'Alice';
    const newPlayer2 = 'Bob';

    service.updatePlayers(newPlayer1, newPlayer2);

    service.player1NameObservable.subscribe(name => {
      expect(name).toBe(newPlayer1);
    });

    service.player2NameObservable.subscribe(name => {
      expect(name).toBe(newPlayer2);
      done();
    });
  });

  it('should update target score', (done) => {
    const newTargetScore = 5000;

    service.updateTargetScore(newTargetScore);

    service.targetScoreObservable.subscribe(score => {
      expect(score).toBe(newTargetScore);
      done();
    });
  });

  it('should return updated target score via getTargetScore', () => {
    const newTargetScore = 3000;
    service.updateTargetScore(newTargetScore);
    expect(service.getTargetScore()).toBe(newTargetScore);
  });

  it('should emit multiple player name updates', () => {
    const emissions: string[] = [];

    service.player1NameObservable.subscribe(name => {
      emissions.push(name);
    });

    service.updatePlayers('First', 'Player2');
    service.updatePlayers('Second', 'Player2');
    service.updatePlayers('Third', 'Player2');

    expect(emissions).toContain('player1'); // initial value
    expect(emissions).toContain('First');
    expect(emissions).toContain('Second');
    expect(emissions).toContain('Third');
  });

  it('should emit multiple target score updates', () => {
    const emissions: number[] = [];

    service.targetScoreObservable.subscribe(score => {
      emissions.push(score);
    });

    service.updateTargetScore(1000);
    service.updateTargetScore(3000);
    service.updateTargetScore(5000);

    expect(emissions).toContain(2000); // initial value
    expect(emissions).toContain(1000);
    expect(emissions).toContain(3000);
    expect(emissions).toContain(5000);
  });
});
