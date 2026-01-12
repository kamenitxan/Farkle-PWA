import {Component, output} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-controls',
  imports: [
    MatButton
  ],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {

  endRoundEvt = output();
  rollAgainEvt = output();

  endRound() {
    this.endRoundEvt.emit();
  }

  rollAgain() {
    this.rollAgainEvt.emit();
  }

}
