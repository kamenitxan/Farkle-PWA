import {Component, Input, input, output} from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  row = input<1 | 2 | 3 | 4 | 5 | 6>(1);
  @Input()
  faces: 1 | 2 | 3 | 4 | 5 | 6 = 5;
  @Input()
  selected = false;
  @Input()
  locked = false;
  @Input()
  wasSelected = false; // For distinguishing between selected (orange) and just locked dice

  diceSelectedEvt = output<DiceSelectedData>()

  changeStatus(event: Event) {
    event.preventDefault();
    if (this.locked) {
      return; // Cannot select locked dice
    }
    this.selected = !this.selected;
    this.diceSelectedEvt.emit({row: this.row(), faces: this.faces})
  }
}

export interface DiceSelectedData {
  row: number;
  faces: number;
}
