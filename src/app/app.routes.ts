import {Routes} from '@angular/router';
import {GameComponent} from './pages/game/game.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {RulesComponent} from './pages/rules/rules.component';

export const routes: Routes = [
  {path: '', component: GameComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'rules', component: RulesComponent}
];
