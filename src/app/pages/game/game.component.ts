import {Component, ViewChild} from '@angular/core';
import {DiceBoardComponent} from './dice-board/dice-board.component';
import {ControlsComponent} from './controls/controls.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {ScoreCalculatorService} from '../../services/score-calculator.service';
import {ScoreKeeperService} from '../../services/score-keeper.service';
import {SettingsService} from '../../services/settings.service';
import {MatDialog} from '@angular/material/dialog';
import {WinnerDialogComponent} from './winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-game',
  imports: [
    DiceBoardComponent,
    ControlsComponent,
    ScoreboardComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  @ViewChild(DiceBoardComponent)
  diceBoard: DiceBoardComponent | undefined = undefined;

  currentPlayer: 1 | 2 = 1;
  selectedScore: number = 0;

  constructor(
    private readonly scoreCalculator: ScoreCalculatorService,
    private readonly scoreKeeperService: ScoreKeeperService,
    private readonly settingsService: SettingsService,
    private readonly dialog: MatDialog,
  ) {
    this.scoreKeeperService.currentPlayerObservable.subscribe(player => {
      this.currentPlayer = player;
    });
  }

  private checkWinnerAndShowDialog() {
    const target = this.settingsService.getTargetScore();
    const p1 = this.scoreKeeperService.getPlayerScore(1);
    const p2 = this.scoreKeeperService.getPlayerScore(2);
    const winner = p1 >= target ? 1 : p2 >= target ? 2 : undefined;
    if (winner) {
      const dialogRef = this.dialog.open(WinnerDialogComponent, {
        data: {
          winner,
          score: winner === 1 ? p1 : p2
        },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(action => {
        if (action === 'new') {
          this.scoreKeeperService.resetAllScores();
          this.diceBoard?.resetAllDice();
        }
      });
      return true;
    }
    return false;
  }

  handleEndRound() {
    if (this.diceBoard) {
      const selectedDice = this.diceBoard.getSelectedDice();
      const score = this.scoreCalculator.calculateScore(selectedDice);
      this.scoreKeeperService.updateRoundScore(score);

      const totalRoundScore = this.scoreKeeperService.getRoundScore();
      this.scoreKeeperService.addToPlayerScore(this.currentPlayer, totalRoundScore);

      this.scoreKeeperService.resetRoundScore();
      this.scoreKeeperService.updateSelectedScore(0);
      this.diceBoard.resetAllDice();

      // winner check
      if (this.checkWinnerAndShowDialog()) {
        return;
      }

      this.scoreKeeperService.updateCurrentPlayer(this.currentPlayer === 1 ? 2 : 1);
    }
  }

  handleRollAgain() {
    if (this.diceBoard) {
      const selectedDice = this.diceBoard.getSelectedDice();
      if (selectedDice.length === 0) {
        console.warn("No dice selected!");
        return;
      }

      const score = this.scoreCalculator.calculateScore(selectedDice);
      this.scoreKeeperService.updateRoundScore(score);
      this.diceBoard.lockSelectedDice();
      this.selectedScore = 0;
      this.scoreKeeperService.updateSelectedScore(0);
    }
  }

  handleDiceSelectionChanged(selectedDice: number[]) {
    if (selectedDice.length > 0) {
      const score = this.scoreCalculator.calculateScore(selectedDice);
      this.selectedScore = score;
      this.scoreKeeperService.updateSelectedScore(score);
    } else {
      this.selectedScore = 0;
      this.scoreKeeperService.updateSelectedScore(0);
    }
  }
}
