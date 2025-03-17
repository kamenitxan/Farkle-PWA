import {Component, input, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {


  player1: string = "";
  player2: string = "";

  showBack = input.required<boolean>();

  constructor(
    private readonly settingsService: SettingsService,
  ) {

  }

  ngOnInit(): void {
    this.settingsService.player1NameObservable.subscribe(player1Name => {
      console.log("updatin1")
      this.player1 = player1Name;
    })
    this.settingsService.player2NameObservable.subscribe(player2Name => {
      this.player2 = player2Name;
      console.log("updatin")
    })
  }

}
