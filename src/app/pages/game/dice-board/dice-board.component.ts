import {Component, OnInit, viewChild, ViewContainerRef} from '@angular/core';
import {DiceComponent, DiceSelectedData} from "../dice/dice.component";

@Component({
  selector: 'app-dice-board',
    imports: [

    ],
  templateUrl: './dice-board.component.html',
  styleUrl: './dice-board.component.scss'
})
export class DiceBoardComponent implements OnInit {
  vcr = viewChild('container', { read: ViewContainerRef });

  dices: any[][] = [...Array(6)].map(e => Array(6));

  ngOnInit(): void {
    this.createDices();
  }

  createDices() {
    for (let row = 0; row < 6; row++) {
      for (let col = 1; col <= 6; col++) {
        const dice = this.vcr()?.createComponent(DiceComponent);
        if (dice) {
          dice.setInput("row", row);
          dice.setInput("faces", col);
          dice.instance.diceSelectedEvt.subscribe(v => this.handleDiceSelected(v));
        }
        this.dices[row][col] = dice;
      }
    }
  }

  handleDiceSelected(v: DiceSelectedData) {
    for (let col = 1; col <= 6; col++) {
      if (col !== v.faces) {
        this.dices[v.row][col].instance.selected = false //.setInput("selected", false);
      }
    }
  }

  getSelectedDice(): number[] {
    return this.dices.flat().filter(d => d.instance.selected).map(d => d.instance.faces);
  }

}
