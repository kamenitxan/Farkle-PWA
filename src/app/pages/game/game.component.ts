import {Component, ViewChild} from '@angular/core';
import {DiceBoardComponent} from './dice-board/dice-board.component';
import {ControlsComponent} from './controls/controls.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {ScoreCalculatorService} from '../../services/score-calculator.service';
import {ScoreKeeperService} from '../../services/score-keeper.service';

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

  constructor(
    private readonly scoreCalculator: ScoreCalculatorService,
    private readonly scoreKeeperService: ScoreKeeperService,
  ) {
    this.scoreKeeperService.currentPlayerObservable.subscribe(player => {
      this.currentPlayer = player;
    });
  }

  handleEndRound() {
    if (this.diceBoard) {
      const selectedDice = this.diceBoard.getSelectedDice();
      console.log("selectedDice", selectedDice);
      const score = this.scoreCalculator.calculateScore(selectedDice);
      console.log("score", score);
      this.scoreKeeperService.updateRoundScore(score);

      // Add round score to player's total score
      const totalRoundScore = this.scoreKeeperService.getRoundScore();
      this.scoreKeeperService.addToPlayerScore(this.currentPlayer, totalRoundScore);

      // Reset for next round
      this.scoreKeeperService.resetRoundScore();
      this.scoreKeeperService.updateSelectedScore(0);

      // Reset all dice
      this.diceBoard.resetAllDice();

      // Switch player
      this.scoreKeeperService.updateCurrentPlayer(this.currentPlayer === 1 ? 2 : 1);
    }
  }

  handleRollAgain() {
    if (this.diceBoard) {
      const selectedDice = this.diceBoard.getSelectedDice();
      console.log("selectedDice for roll again", selectedDice);

      if (selectedDice.length === 0) {
        console.warn("No dice selected!");
        return;
      }

      const score = this.scoreCalculator.calculateScore(selectedDice);
      console.log("score for roll again", score);

      // Add to round score
      this.scoreKeeperService.updateRoundScore(score);

      // Lock selected dice (change color, don't remove)
      this.diceBoard.lockSelectedDice();

      // Reset selected score display
      this.scoreKeeperService.updateSelectedScore(0);
    }
  }

  handleDiceSelectionChanged(selectedDice: number[]) {
    if (selectedDice.length > 0) {
      const score = this.scoreCalculator.calculateScore(selectedDice);
      this.scoreKeeperService.updateSelectedScore(score);
    } else {
      this.scoreKeeperService.updateSelectedScore(0);
    }
  }

}


