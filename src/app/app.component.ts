import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {filter} from 'rxjs';

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
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.showBack = event.url !== "/";
      this.currentRoute = event.url;
    });
  }
}
