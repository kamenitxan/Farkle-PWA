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

  it('should have initial player 1 score of 0', () => {
    expect(service.player1Score()).toBe(0);
  });

  it('should have initial player 2 score of 0', () => {
    expect(service.player2Score()).toBe(0);
  });

  it('should have initial round score of 0', () => {
    expect(service.roundScore()).toBe(0);
  });

  it('should have initial selected score of 0', () => {
    expect(service.selectedScore()).toBe(0);
  });

  it('should have initial current player of 1', () => {
    expect(service.currentPlayer()).toBe(1);
  });

  it('should return initial round score', () => {
    expect(service.getRoundScore()).toBe(0);
  });

  it('should update selected score', () => {
    service.updateSelectedScore(500);
    expect(service.selectedScore()).toBe(500);
  });

  it('should update round score', () => {
    service.updateRoundScore(300);
    expect(service.roundScore()).toBe(300);
  });

  it('should accumulate round score on multiple updates', () => {
    service.updateRoundScore(100);
    service.updateRoundScore(200);
    service.updateRoundScore(150);
    expect(service.roundScore()).toBe(450);
  });

  it('should reset round score to 0', () => {
    service.updateRoundScore(500);
    service.resetRoundScore();
    expect(service.roundScore()).toBe(0);
  });

  it('should add score to player 1', () => {
    service.addToPlayerScore(1, 250);
    expect(service.player1Score()).toBe(250);
  });

  it('should add score to player 2', () => {
    service.addToPlayerScore(2, 300);
    expect(service.player2Score()).toBe(300);
  });

  it('should accumulate scores for player 1', () => {
    service.addToPlayerScore(1, 100);
    service.addToPlayerScore(1, 200);
    service.addToPlayerScore(1, 150);
    expect(service.player1Score()).toBe(450);
  });

  it('should accumulate scores for player 2', () => {
    service.addToPlayerScore(2, 150);
    service.addToPlayerScore(2, 250);
    expect(service.player2Score()).toBe(400);
  });

  it('should maintain separate scores for players', () => {
    service.addToPlayerScore(1, 300);
    service.addToPlayerScore(2, 500);
    expect(service.player1Score()).toBe(300);
    expect(service.player2Score()).toBe(500);
  });

  it('should accumulate round score on multiple updates and reflect final value', () => {
    service.updateRoundScore(100);
    service.updateRoundScore(200);
    service.updateRoundScore(300);
    expect(service.roundScore()).toBe(600);
  });

  it('should handle round score reset and restart', () => {
    service.updateRoundScore(500);
    service.resetRoundScore();
    service.updateRoundScore(200);
    expect(service.roundScore()).toBe(200);
  });

  describe('updateCurrentPlayer', () => {
    it('should update current player to 2', () => {
      service.updateCurrentPlayer(2);
      expect(service.currentPlayer()).toBe(2);
    });

    it('should update current player back to 1', () => {
      service.updateCurrentPlayer(2);
      service.updateCurrentPlayer(1);
      expect(service.currentPlayer()).toBe(1);
    });
  });

  describe('getPlayerScore', () => {
    it('should return player 1 score', () => {
      service.addToPlayerScore(1, 350);
      expect(service.getPlayerScore(1)).toBe(350);
    });

    it('should return player 2 score', () => {
      service.addToPlayerScore(2, 600);
      expect(service.getPlayerScore(2)).toBe(600);
    });

    it('should return 0 when no score added', () => {
      expect(service.getPlayerScore(1)).toBe(0);
      expect(service.getPlayerScore(2)).toBe(0);
    });
  });

  describe('resetAllScores', () => {
    it('should reset all scores and state to initial values', () => {
      service.addToPlayerScore(1, 500);
      service.addToPlayerScore(2, 700);
      service.updateRoundScore(300);
      service.updateSelectedScore(100);
      service.updateCurrentPlayer(2);

      service.resetAllScores();

      expect(service.player1Score()).toBe(0);
      expect(service.player2Score()).toBe(0);
      expect(service.roundScore()).toBe(0);
      expect(service.selectedScore()).toBe(0);
      expect(service.currentPlayer()).toBe(1);
    });
  });
});
