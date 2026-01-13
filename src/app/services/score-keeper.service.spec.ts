import {TestBed} from '@angular/core/testing';

import {ScoreKeeperService} from './score-keeper.service';

describe('ScoreKeeperService', () => {
  let service: ScoreKeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreKeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial player 1 score of 0', (done) => {
    service.player1ScoreObservable.subscribe(score => {
      expect(score).toBe(0);
      done();
    });
  });

  it('should have initial player 2 score of 0', (done) => {
    service.player2ScoreObservable.subscribe(score => {
      expect(score).toBe(0);
      done();
    });
  });

  it('should have initial round score of 0', (done) => {
    service.roundScoreObservable.subscribe(score => {
      expect(score).toBe(0);
      done();
    });
  });

  it('should have initial selected score of 0', (done) => {
    service.selectedScoreObservable.subscribe(score => {
      expect(score).toBe(0);
      done();
    });
  });

  it('should have initial current player of 1', (done) => {
    service.currentPlayerObservable.subscribe(player => {
      expect(player).toBe(1);
      done();
    });
  });

  it('should return initial round score', () => {
    expect(service.getRoundScore()).toBe(0);
  });

  it('should update selected score', (done) => {
    service.updateSelectedScore(500);
    service.selectedScoreObservable.subscribe(score => {
      expect(score).toBe(500);
      done();
    });
  });

  it('should update round score', (done) => {
    service.updateRoundScore(300);
    service.roundScoreObservable.subscribe(score => {
      expect(score).toBe(300);
      done();
    });
  });

  it('should accumulate round score on multiple updates', (done) => {
    service.updateRoundScore(100);
    service.updateRoundScore(200);
    service.updateRoundScore(150);
    service.roundScoreObservable.subscribe(score => {
      expect(score).toBe(450);
      done();
    });
  });

  it('should reset round score to 0', (done) => {
    service.updateRoundScore(500);
    service.resetRoundScore();
    service.roundScoreObservable.subscribe(score => {
      expect(score).toBe(0);
      done();
    });
  });

  it('should add score to player 1', (done) => {
    service.addToPlayerScore(1, 250);
    service.player1ScoreObservable.subscribe(score => {
      expect(score).toBe(250);
      done();
    });
  });

  it('should add score to player 2', (done) => {
    service.addToPlayerScore(2, 300);
    service.player2ScoreObservable.subscribe(score => {
      expect(score).toBe(300);
      done();
    });
  });

  it('should accumulate scores for player 1', (done) => {
    service.addToPlayerScore(1, 100);
    service.addToPlayerScore(1, 200);
    service.addToPlayerScore(1, 150);
    service.player1ScoreObservable.subscribe(score => {
      expect(score).toBe(450);
      done();
    });
  });

  it('should accumulate scores for player 2', (done) => {
    service.addToPlayerScore(2, 150);
    service.addToPlayerScore(2, 250);
    service.player2ScoreObservable.subscribe(score => {
      expect(score).toBe(400);
      done();
    });
  });

  it('should maintain separate scores for players', (done) => {
    service.addToPlayerScore(1, 300);
    service.addToPlayerScore(2, 500);

    let player1Score = 0;
    let player2Score = 0;
    let completed = 0;

    service.player1ScoreObservable.subscribe(score => {
      player1Score = score;
      completed++;
      if (completed === 2) {
        expect(player1Score).toBe(300);
        expect(player2Score).toBe(500);
        done();
      }
    });

    service.player2ScoreObservable.subscribe(score => {
      player2Score = score;
      completed++;
      if (completed === 2) {
        expect(player1Score).toBe(300);
        expect(player2Score).toBe(500);
        done();
      }
    });
  });

  it('should emit multiple round score updates', () => {
    const emissions: number[] = [];

    service.roundScoreObservable.subscribe(score => {
      emissions.push(score);
    });

    service.updateRoundScore(100);
    service.updateRoundScore(200);
    service.updateRoundScore(300);

    expect(emissions).toContain(0); // initial value
    expect(emissions).toContain(100);
    expect(emissions).toContain(300);
    expect(emissions).toContain(600);
  });

  it('should handle round score reset and restart', (done) => {
    const emissions: number[] = [];

    service.roundScoreObservable.subscribe(score => {
      emissions.push(score);
    });

    service.updateRoundScore(500);
    service.resetRoundScore();
    service.updateRoundScore(200);

    setTimeout(() => {
      expect(emissions[emissions.length - 1]).toBe(200);
      done();
    }, 0);
  });
});
