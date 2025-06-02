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


  constructor(
    private readonly scoreCalculator: ScoreCalculatorService,
    private readonly scoreKeeperService: ScoreKeeperService,
  ) {
  }

  handleEndRound() {
    if (this.diceBoard) {
      const selectedDice = this.diceBoard.getSelectedDice();
      console.log("selectedDice", selectedDice);
      const score = this.scoreCalculator.calculateScore(selectedDice);
      console.log("score", score);
      this.scoreKeeperService.updateRoundScore(score);
      this.scoreKeeperService.updateSelectedScore(0);
    }
  }

}


