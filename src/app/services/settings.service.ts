import {Injectable, Optional, SkipSelf} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly STORAGE_KEY_PLAYER1 = 'farkle_player1_name';
  private readonly STORAGE_KEY_PLAYER2 = 'farkle_player2_name';
  private readonly STORAGE_KEY_TARGET_SCORE = 'farkle_target_score';
  private readonly DEFAULT_PLAYER1 = 'player1';
  private readonly DEFAULT_PLAYER2 = 'player2';
  private readonly DEFAULT_TARGET_SCORE = 2000;

  private readonly _player1NameSubject = new BehaviorSubject<string>(this.getFromStorage(this.STORAGE_KEY_PLAYER1, this.DEFAULT_PLAYER1));
  private readonly _player2NameSubject = new BehaviorSubject<string>(this.getFromStorage(this.STORAGE_KEY_PLAYER2, this.DEFAULT_PLAYER2));
  player1NameObservable = this._player1NameSubject.asObservable();
  player2NameObservable = this._player2NameSubject.asObservable();

  private readonly _targetScoreSubject = new BehaviorSubject<number>(this.getFromStorageNumber(this.STORAGE_KEY_TARGET_SCORE, this.DEFAULT_TARGET_SCORE));
  targetScoreObservable = this._targetScoreSubject.asObservable();

  constructor(@Optional() @SkipSelf() parent?: SettingsService) {
    console.log("SERVICE CONSTRUCTOR");
    if (parent) {
      throw new Error(
        `[GuardedSingletonService]: trying to create multiple instances,
        but this service should be a singleton.`
      );
    }
  }

  private getFromStorage(key: string, defaultValue: string): string {
    try {
      const value = localStorage.getItem(key);
      return value || defaultValue;
    } catch (e) {
      console.warn(`Failed to read from localStorage: ${key}`, e);
      return defaultValue;
    }
  }

  private getFromStorageNumber(key: string, defaultValue: number): number {
    try {
      const value = localStorage.getItem(key);
      return value ? parseInt(value, 10) : defaultValue;
    } catch (e) {
      console.warn(`Failed to read from localStorage: ${key}`, e);
      return defaultValue;
    }
  }

  private saveToStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`Failed to write to localStorage: ${key}`, e);
    }
  }

  updatePlayers(player1: string, player2: string) {
    this._player1NameSubject.next(player1);
    this._player2NameSubject.next(player2);
    this.saveToStorage(this.STORAGE_KEY_PLAYER1, player1);
    this.saveToStorage(this.STORAGE_KEY_PLAYER2, player2);
    console.log(player1, player2);
  }

  updateTargetScore(targetScore: number) {
    this._targetScoreSubject.next(targetScore);
    this.saveToStorage(this.STORAGE_KEY_TARGET_SCORE, targetScore.toString());
  }

  getTargetScore(): number {
    return this._targetScoreSubject.value;
  }
}
