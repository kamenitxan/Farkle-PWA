import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {provideRouter} from '@angular/router';
import {provideLocationMocks} from '@angular/common/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // Set required input before component initialization
    fixture.componentRef.setInput('showBack', false);
    fixture.componentRef.setInput('currentRoute', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default player names', () => {
    expect(component.player1).toBe('player1');
    expect(component.player2).toBe('player2');
  });

  it('should return correct header title for settings route', () => {
    fixture.componentRef.setInput('currentRoute', '/settings');
    fixture.detectChanges();
    const title = component.getHeaderTitle();
    expect(title).toBe('Settings');
  });

  it('should return correct header title for rules route', () => {
    fixture.componentRef.setInput('currentRoute', '/rules');
    fixture.detectChanges();
    const title = component.getHeaderTitle();
    expect(title).toBe('Rules');
  });

  it('should return default Farkle title for other routes', () => {
    fixture.componentRef.setInput('currentRoute', '/game');
    fixture.detectChanges();
    const title = component.getHeaderTitle();
    expect(title).toBe('Farkle');
  });
});
