import { Component } from '@angular/core';
import {DiceComponent} from "../dice/dice.component";

@Component({
  selector: 'app-dice-board',
    imports: [
        DiceComponent
    ],
  templateUrl: './dice-board.component.html',
  styleUrl: './dice-board.component.scss'
})
export class DiceBoardComponent {

}
