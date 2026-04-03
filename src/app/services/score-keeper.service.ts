import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreKeeperService {

  private readonly _player1Score = signal(0);
  private readonly _player2Score = signal(0);
  private readonly _roundScore = signal(0);
  private readonly _selectedScore = signal(0);
  private readonly _currentPlayer = signal<1 | 2>(1);

  readonly player1Score = this._player1Score.asReadonly();
  readonly player2Score = this._player2Score.asReadonly();
  readonly roundScore = this._roundScore.asReadonly();
  readonly selectedScore = this._selectedScore.asReadonly();
  readonly currentPlayer = this._currentPlayer.asReadonly();

  updateSelectedScore(score: number) {
    this._selectedScore.set(score);
  }

  getRoundScore(): number {
    return this._roundScore();
  }

  updateRoundScore(score: number) {
    this._roundScore.update(v => v + score);
  }

  resetRoundScore() {
    this._roundScore.set(0);
  }

  addToPlayerScore(player: 1 | 2, score: number) {
    if (player === 1) {
      this._player1Score.update(v => v + score);
    } else {
      this._player2Score.update(v => v + score);
    }
  }

  updateCurrentPlayer(player: 1 | 2) {
    this._currentPlayer.set(player);
  }

  getPlayerScore(player: 1 | 2): number {
    return player === 1 ? this._player1Score() : this._player2Score();
  }

  resetAllScores() {
    this._player1Score.set(0);
    this._player2Score.set(0);
    this._roundScore.set(0);
    this._selectedScore.set(0);
    this._currentPlayer.set(1);
  }
}
