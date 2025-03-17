import {Injectable, Optional, SkipSelf} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly _player1NameSubject = new BehaviorSubject<string>("player1");
  private readonly _player2NameSubject = new BehaviorSubject<string>("player2");
  player1NameObservable = this._player1NameSubject.asObservable();
  player2NameObservable = this._player2NameSubject.asObservable();

  constructor(@Optional() @SkipSelf() parent?: SettingsService) {
    console.log("SERVICE CONSTRUCTOR");
    if (parent) {
      throw Error(
        `[GuardedSingletonService]: trying to create multiple instances,
        but this service should be a singleton.`
      );
    }
  }


  updatePlayers(player1: string, player2: string) {
    this._player1NameSubject.next(player1);
    this._player2NameSubject.next(player2);
    console.log(player1, player2);
  }
}
