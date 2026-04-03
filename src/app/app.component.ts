import {Component, effect, inject} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {filter} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {SettingsService} from './services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'farkle-pwa';

  showBack: boolean = false;
  currentRoute: string = '';

  constructor(
    private readonly router: Router,
  ) {
    const doc = inject(DOCUMENT);
    const settingsService = inject(SettingsService);

    effect(() => {
      doc.documentElement.classList.toggle('dark-theme', settingsService.theme() === 'dark');
    });

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.showBack = event.url !== "/";
      this.currentRoute = event.url;
    });
  }
}
