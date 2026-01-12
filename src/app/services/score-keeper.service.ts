import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreKeeperService {

  private readonly _player1ScoreSubject = new BehaviorSubject<number>(0);
  private readonly _player2ScoreSubject = new BehaviorSubject<number>(0);
  player1ScoreObservable = this._player1ScoreSubject.asObservable();
  player2ScoreObservable = this._player2ScoreSubject.asObservable();

  private roundScore: number = 0;
  private readonly _roundScoreSubject = new BehaviorSubject<number>(this.roundScore);
  roundScoreObservable = this._roundScoreSubject.asObservable();
  private readonly _selectedScoreSubject = new BehaviorSubject<number>(0);
  selectedScoreObservable = this._selectedScoreSubject.asObservable();

  private readonly _currentPlayerSubject = new BehaviorSubject<1 | 2>(1);
  currentPlayerObservable = this._currentPlayerSubject.asObservable();

  constructor() { }

  updateSelectedScore(score: number) {
    this._selectedScoreSubject.next(score);
  }

  getRoundScore(): number {
    return this.roundScore;
  }

  updateRoundScore(score: number) {
    this.roundScore += score;
    this._roundScoreSubject.next(this.roundScore);
  }

  resetRoundScore() {
    this.roundScore = 0;
    this._roundScoreSubject.next(this.roundScore);
  }

  addToPlayerScore(player: 1 | 2, score: number) {
    if (player === 1) {
      const currentScore = this._player1ScoreSubject.value;
      this._player1ScoreSubject.next(currentScore + score);
    } else {
      const currentScore = this._player2ScoreSubject.value;
      this._player2ScoreSubject.next(currentScore + score);
    }
  }

  updateCurrentPlayer(player: 1 | 2) {
    this._currentPlayerSubject.next(player);
  }
}
