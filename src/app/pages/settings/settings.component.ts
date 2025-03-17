import {Component, inject} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({
    player1Name: ['', [Validators.required]],
    player2Name: ['', [Validators.required]],
  });

  constructor(private readonly settingsService: SettingsService) {
    this.settingsService.player1NameObservable.subscribe(player1Name => {
      console.log("patching player1Name", player1Name);
      this.form.patchValue({player1Name: player1Name});
    })
    this.settingsService.player2NameObservable.subscribe(player2Name => {
      this.form.patchValue({player2Name: player2Name});
    })

  }

  onSubmit() {
    if (this.form.valid) {
      this.settingsService.updatePlayers("" + this.form.value.player1Name, "" + this.form.value.player2Name);
    }
  }
}
