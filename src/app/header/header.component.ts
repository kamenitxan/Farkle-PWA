import {Component, input, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {


  player1: string = "";
  player2: string = "";

  showBack = input.required<boolean>();
  currentRoute = input<string>('');

  constructor(
    private readonly settingsService: SettingsService,
  ) {

  }

  ngOnInit(): void {
    this.settingsService.player1NameObservable.subscribe(player1Name => {
      this.player1 = player1Name;
    })
    this.settingsService.player2NameObservable.subscribe(player2Name => {
      this.player2 = player2Name;
    })
  }

  getHeaderTitle(): string {
    const route = this.currentRoute();
    if (route === '/settings') {
      return $localize`:@@header.settings:Settings`;
    } else if (route === '/rules') {
      return $localize`:@@header.rules:Rules`;
    } else {
      return "Farkle";
    }
  }

  changeLanguage(lang: string): void {
    window.location.href = `/${lang}`;
  }

  getCurrentLanguageFlag(): string {
    const route = window.location.href;
    if (route.includes('/cs')) {
      return '🇨🇿';
    } else if (route.includes('/en')) {
      return '🇬🇧';
    }
    // Default vlajka, pokud je na home page
    return '🇬🇧';
  }

}
