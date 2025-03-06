import { Component } from '@angular/core';
import {ScoreComponent} from './score/score.component';
import {DiceComponent} from './dice/dice.component';
import {DiceBoardComponent} from './dice-board/dice-board.component';

@Component({
  selector: 'app-game',
  imports: [
    ScoreComponent,
    DiceComponent,
    DiceBoardComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

}
