import {Component, input, OnInit} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';
import {ScoreKeeperService} from '../../../services/score-keeper.service';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-scoreboard',
  imports: [MatCard, MatCardContent],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit {

  playerId = input.required<1 | 2>();
  playerName: string = "";
  score: number = 0;
  roundScore: number = 0;
  selectedScore: number = 0;
  targetScore: number = 2000;

  constructor(
    private readonly settingsService: SettingsService,
    private readonly scoreKeeperService: ScoreKeeperService,
  ) {

  }

  ngOnInit(): void {
    if (this.playerId() === 1) {
      this.settingsService.player1NameObservable.subscribe(player1Name => {
        this.playerName = player1Name;
      });
      this.scoreKeeperService.player1ScoreObservable.subscribe(score => {
        this.score = score;
      });
    } else {
      this.settingsService.player2NameObservable.subscribe(player2Name => {
        this.playerName = player2Name;
      });
      this.scoreKeeperService.player2ScoreObservable.subscribe(score => {
        this.score = score;
      });
    }
    this.scoreKeeperService.roundScoreObservable.subscribe(score => {
      this.roundScore = score;
    });
    this.scoreKeeperService.selectedScoreObservable.subscribe(score => {
      this.selectedScore = score;
    });
    this.settingsService.targetScoreObservable.subscribe(targetScore => {
      this.targetScore = targetScore;
    });
  }
}
