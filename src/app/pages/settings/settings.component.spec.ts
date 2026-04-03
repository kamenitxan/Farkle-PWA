import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SettingsComponent} from './settings.component';
import {provideRouter} from '@angular/router';
import {provideLocationMocks} from '@angular/common/testing';
import {SettingsService} from '../../services/settings.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise form with values from SettingsService', () => {
    expect(component.form.value.player1Name).toBe('player1');
    expect(component.form.value.player2Name).toBe('player2');
    expect(component.form.value.targetScore).toBe(2000);
    expect(component.form.value.theme).toBe('light');
  });

  describe('onSubmit', () => {
    it('should call updatePlayers and updateTargetScore when form is valid', () => {
      const settingsService = TestBed.inject(SettingsService);
      spyOn(settingsService, 'updatePlayers');
      spyOn(settingsService, 'updateTargetScore');

      component.form.setValue({player1Name: 'Alice', player2Name: 'Bob', targetScore: 3000, theme: 'light'});
      component.onSubmit();

      expect(settingsService.updatePlayers).toHaveBeenCalledWith('Alice', 'Bob');
      expect(settingsService.updateTargetScore).toHaveBeenCalledWith(3000);
    });

    it('should not call service methods when form is invalid', () => {
      const settingsService = TestBed.inject(SettingsService);
      spyOn(settingsService, 'updatePlayers');

      component.form.setValue({player1Name: '', player2Name: '', targetScore: 50, theme: 'light'});
      component.onSubmit();

      expect(settingsService.updatePlayers).not.toHaveBeenCalled();
    });
  });

  describe('theme change', () => {
    it('should call updateTheme when theme form control changes', () => {
      const settingsService = TestBed.inject(SettingsService);
      spyOn(settingsService, 'updateTheme');

      component.form.get('theme')!.setValue('dark');

      expect(settingsService.updateTheme).toHaveBeenCalledWith('dark');
    });

    it('should call updateTheme with medieval when medieval is selected', () => {
      const settingsService = TestBed.inject(SettingsService);
      spyOn(settingsService, 'updateTheme');

      component.form.get('theme')!.setValue('medieval');

      expect(settingsService.updateTheme).toHaveBeenCalledWith('medieval');
    });
  });
});
