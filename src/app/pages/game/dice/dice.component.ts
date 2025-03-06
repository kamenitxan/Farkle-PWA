import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {
  faces: 1 | 2 | 3 | 4 | 5 | 6 =  5;
}
