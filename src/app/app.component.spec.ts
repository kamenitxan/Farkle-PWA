import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideRouter} from '@angular/router';
import {provideLocationMocks} from '@angular/common/testing';
import {SettingsService} from './services/settings.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks()
      ]
    }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark-theme', 'medieval-theme');
    localStorage.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'farkle-pwa' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('farkle-pwa');
  });

  it('should apply dark-theme class when theme is dark', () => {
    TestBed.createComponent(AppComponent);
    const settingsService = TestBed.inject(SettingsService);

    settingsService.updateTheme('dark');
    TestBed.flushEffects();

    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });

  it('should apply medieval-theme class when theme is medieval', () => {
    TestBed.createComponent(AppComponent);
    const settingsService = TestBed.inject(SettingsService);

    settingsService.updateTheme('medieval');
    TestBed.flushEffects();

    expect(document.documentElement.classList.contains('medieval-theme')).toBe(true);
  });

  it('should remove old theme class when switching themes', () => {
    TestBed.createComponent(AppComponent);
    const settingsService = TestBed.inject(SettingsService);

    settingsService.updateTheme('dark');
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);

    settingsService.updateTheme('light');
    TestBed.flushEffects();
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    expect(document.documentElement.classList.contains('medieval-theme')).toBe(false);
  });
});


