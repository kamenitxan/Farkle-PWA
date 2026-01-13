import {Component, OnInit, output, viewChild, ViewContainerRef} from '@angular/core';
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

  dices: any[][] = [...Array(6)].map(e => new Array(6));

  diceSelectionChanged = output<number[]>();

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
    // Emit the current selected dice
    this.diceSelectionChanged.emit(this.getSelectedDice());
  }

  getSelectedDice(): number[] {
    return this.dices.flat().filter(d => d?.instance && d?.instance.selected).map(d => d.instance.faces);
  }

  lockSelectedDice() {
    // First, find all rows that have selected dice
    const rowsWithSelectedDice = new Set<number>();
    this.dices.forEach((row, rowIndex) => {
      row.forEach(dice => {
        if (dice?.instance && dice.instance.selected) {
          rowsWithSelectedDice.add(rowIndex);
        }
      });
    });

    // Lock all dice in those rows
    this.dices.forEach((row, rowIndex) => {
      if (rowsWithSelectedDice.has(rowIndex)) {
        row.forEach(dice => {
          if (dice?.instance) {
            const wasSelected = dice.instance.selected;
            dice.instance.locked = true;
            dice.instance.selected = false;
            // Keep track if this dice was actually selected (for orange color)
            if (dice.instance.hasOwnProperty('wasSelected')) {
              dice.instance.wasSelected = dice.instance.wasSelected || wasSelected;
            } else {
              dice.instance.wasSelected = wasSelected;
            }
          }
        });
      }
    });
  }

  resetAllDice() {
    this.dices.flat().forEach(dice => {
      if (dice?.instance) {
        dice.instance.selected = false;
        dice.instance.locked = false;
        dice.instance.wasSelected = false;
      }
    });
  }

}
