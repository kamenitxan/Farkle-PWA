import {Component, inject} from '@angular/core';
import {AppTheme, SettingsService} from '../../services/settings.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatCard,
    MatCardContent,
    MatButton,
    MatButtonToggleModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  private readonly fb = inject(FormBuilder);
  form = this.fb.group({
    player1Name: ['', [Validators.required]],
    player2Name: ['', [Validators.required]],
    targetScore: [2000, [Validators.required, Validators.min(100)]],
    theme: ['light'],
  });

  constructor(
    private readonly settingsService: SettingsService,
    private readonly router: Router
  ) {
    this.settingsService.player1NameObservable.subscribe(player1Name => {
      this.form.patchValue({player1Name: player1Name});
    });
    this.settingsService.player2NameObservable.subscribe(player2Name => {
      this.form.patchValue({player2Name: player2Name});
    });
    this.settingsService.targetScoreObservable.subscribe(targetScore => {
      this.form.patchValue({targetScore: targetScore});
    });
    this.form.patchValue({theme: this.settingsService.theme()});

    this.form.get('theme')!.valueChanges.subscribe(theme => {
      this.settingsService.updateTheme((theme ?? 'light') as AppTheme);
    });
  }

  swapPlayers() {
    const p1 = this.form.value.player1Name;
    const p2 = this.form.value.player2Name;
    this.form.patchValue({player1Name: p2, player2Name: p1});
  }

  onSubmit() {
    if (this.form.valid) {
      this.settingsService.updatePlayers("" + this.form.value.player1Name, "" + this.form.value.player2Name);
      this.settingsService.updateTargetScore(Number(this.form.value.targetScore) || 2000);
      this.router.navigate(['']);
    }
  }
}
