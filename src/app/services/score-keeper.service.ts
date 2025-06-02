import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreKeeperService {

  private readonly _player1ScoreSubject = new BehaviorSubject<number>(0);
  private readonly _player2ScoreSubject = new BehaviorSubject<number>(1);
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

  updateRoundScore(score: number) {
    this._roundScoreSubject.next(this.roundScore + score);
  }

  updateCurrentPlayer(player: 1 | 2) {
    this._currentPlayerSubject.next(player);
  }
}
