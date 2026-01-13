import {TestBed} from '@angular/core/testing';

import {ScoreCalculatorService} from './score-calculator.service';

describe('ScoreCalculatorService', () => {
  let service: ScoreCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate score for single 1', () => {
    const dice = [1];
    expect(service.calculateScore(dice)).toBe(100);
  });

  it('should calculate score for single 5', () => {
    const dice = [5];
    expect(service.calculateScore(dice)).toBe(50);
  });

  it('should calculate score for three of a kind (1s)', () => {
    const dice = [1, 1, 1];
    expect(service.calculateScore(dice)).toBe(1000);
  });

  it('should calculate score for three of a kind (other numbers)', () => {
    const dice = [3, 3, 3];
    expect(service.calculateScore(dice)).toBe(300);
  });

  it('should calculate score for four of a kind (doubles the base score)', () => {
    const dice = [2, 2, 2, 2];
    expect(service.calculateScore(dice)).toBe(400);
  });

  it('should calculate score for five of a kind (quadruples the base score)', () => {
    const dice = [4, 4, 4, 4, 4];
    expect(service.calculateScore(dice)).toBe(1600);
  });

  it('should calculate score for six of a kind', () => {
    const dice = [5, 5, 5, 5, 5, 5];
    expect(service.calculateScore(dice)).toBe(4000);
  });

  it('should calculate score for full straight (1-6)', () => {
    const dice = [1, 2, 3, 4, 5, 6];
    expect(service.calculateScore(dice)).toBe(1500);
  });

  it('should calculate score for partial straight (1-5)', () => {
    const dice = [1, 2, 3, 4, 5];
    expect(service.calculateScore(dice)).toBe(500);
  });

  it('should calculate score for partial straight (2-6)', () => {
    const dice = [2, 3, 4, 5, 6];
    expect(service.calculateScore(dice)).toBe(750);
  });

  it('should calculate score for mixed scoring combinations', () => {
    const dice = [1, 1, 1, 5];
    expect(service.calculateScore(dice)).toBe(1050);
  });

  it('should return 0 for non-scoring dice', () => {
    const dice = [2, 3, 4];
    expect(service.calculateScore(dice)).toBe(0);
  });

  it('should handle multiple single 1s and 5s', () => {
    const dice = [1, 1, 5, 5];
    expect(service.calculateScore(dice)).toBe(300);
  });

  it('should calculate score for three of a kind with additional 1s', () => {
    const dice = [2, 2, 2, 1, 1];
    expect(service.calculateScore(dice)).toBe(400);
  });

  it('should calculate score for three 1s plus 5s', () => {
    const dice = [1, 1, 1, 5, 5, 5];
    expect(service.calculateScore(dice)).toBe(1500);
  });

  it('should handle dice array of different sizes', () => {
    const dice2 = [1];
    const dice3 = [1, 1, 1];
    const dice6 = [1, 2, 3, 4, 5, 6];

    expect(service.calculateScore(dice2)).toBe(100);
    expect(service.calculateScore(dice3)).toBe(1000);
    expect(service.calculateScore(dice6)).toBe(1500);
  });
});
