import {Component, computed, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {SettingsService} from '../../../services/settings.service';
import {ScoreKeeperService} from '../../../services/score-keeper.service';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-scoreboard',
  imports: [MatCard, MatCardContent],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent {

  readonly playerId = input.required<1 | 2>();

  private readonly settingsService = inject(SettingsService);
  private readonly scoreKeeperService = inject(ScoreKeeperService);

  private readonly player1Name = toSignal(this.settingsService.player1NameObservable, {initialValue: ''});
  private readonly player2Name = toSignal(this.settingsService.player2NameObservable, {initialValue: ''});

  readonly playerName = computed(() => this.playerId() === 1 ? this.player1Name() : this.player2Name());
  readonly score = computed(() => this.playerId() === 1 ? this.scoreKeeperService.player1Score() : this.scoreKeeperService.player2Score());
  readonly roundScore = this.scoreKeeperService.roundScore;
  readonly selectedScore = this.scoreKeeperService.selectedScore;
  readonly targetScore = toSignal(this.settingsService.targetScoreObservable, {initialValue: 2000});
  readonly isCurrentPlayer = computed(() => this.scoreKeeperService.currentPlayer() === this.playerId());
}
