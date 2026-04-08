import {Injectable} from '@angular/core';

export interface DiceRowState {
  lockedFace: number | null;
  selectedFace: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private _diceState: DiceRowState[] = this.emptyState();

  get diceState(): DiceRowState[] {
    return this._diceState;
  }

  saveDiceState(state: DiceRowState[]): void {
    this._diceState = state.map(s => ({...s}));
  }

  clearDiceState(): void {
    this._diceState = this.emptyState();
  }

  hasDiceState(): boolean {
    return this._diceState.some(s => s.lockedFace !== null || s.selectedFace !== null);
  }

  private emptyState(): DiceRowState[] {
    return Array(6).fill(null).map(() => ({lockedFace: null, selectedFace: null}));
  }
}
