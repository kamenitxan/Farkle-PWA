import {Component, input, OnInit} from '@angular/core';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent implements OnInit {

  playerId = input.required<1 | 2>();
  playerName: string = "";

  constructor(
    private readonly settingsService: SettingsService,
  ) {

  }

  ngOnInit(): void {
    if (this.playerId() === 1) {
      this.settingsService.player1NameObservable.subscribe(player1Name => {
        this.playerName = player1Name;
      });
    } else {
      this.settingsService.player2NameObservable.subscribe(player2Name => {
        this.playerName = player2Name;
      })
    }
  }
}
