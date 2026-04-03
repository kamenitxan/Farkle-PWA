import {ComponentFixture, TestBed} from '@angular/core/testing';
import {signal} from '@angular/core';
import {Subject} from 'rxjs';
import {ScoreboardComponent} from './scoreboard.component';
import {ScoreKeeperService} from '../../../services/score-keeper.service';
import {SettingsService} from '../../../services/settings.service';

describe('ScoreboardComponent', () => {
  let fixture: ComponentFixture<ScoreboardComponent>;
  let component: ScoreboardComponent;

  let mockPlayer1Score = signal(0);
  let mockPlayer2Score = signal(0);
  let mockRoundScore = signal(0);
  let mockSelectedScore = signal(0);
  let mockCurrentPlayer = signal<1 | 2>(1);

  let player1NameSubject: Subject<string>;
  let player2NameSubject: Subject<string>;
  let targetScoreSubject: Subject<number>;

  beforeEach(async () => {
    mockPlayer1Score = signal(0);
    mockPlayer2Score = signal(0);
    mockRoundScore = signal(0);
    mockSelectedScore = signal(0);
    mockCurrentPlayer = signal<1 | 2>(1);

    player1NameSubject = new Subject<string>();
    player2NameSubject = new Subject<string>();
    targetScoreSubject = new Subject<number>();

    const mockScoreKeeperService = {
      player1Score: mockPlayer1Score.asReadonly(),
      player2Score: mockPlayer2Score.asReadonly(),
      roundScore: mockRoundScore.asReadonly(),
      selectedScore: mockSelectedScore.asReadonly(),
      currentPlayer: mockCurrentPlayer.asReadonly()
    };

    const mockSettingsService = {
      player1NameObservable: player1NameSubject.asObservable(),
      player2NameObservable: player2NameSubject.asObservable(),
      targetScoreObservable: targetScoreSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [ScoreboardComponent],
      providers: [
        {provide: ScoreKeeperService, useValue: mockScoreKeeperService},
        {provide: SettingsService, useValue: mockSettingsService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('playerId', 1);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should accept playerId input as 1', () => {
      fixture.componentRef.setInput('playerId', 1);
      expect(component.playerId()).toBe(1);
    });

    it('should accept playerId input as 2', () => {
      fixture.componentRef.setInput('playerId', 2);
      expect(component.playerId()).toBe(2);
    });
  });

  describe('Default property values', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 1);
    });

    it('should have playerName initialized as empty string', () => {
      expect(component.playerName()).toBe('');
    });

    it('should have score initialized as 0', () => {
      expect(component.score()).toBe(0);
    });

    it('should have roundScore initialized as 0', () => {
      expect(component.roundScore()).toBe(0);
    });

    it('should have selectedScore initialized as 0', () => {
      expect(component.selectedScore()).toBe(0);
    });

    it('should have targetScore initialized as 2000', () => {
      expect(component.targetScore()).toBe(2000);
    });

    it('should have isCurrentPlayer initialized as true when player 1 is current', () => {
      expect(component.isCurrentPlayer()).toBe(true);
    });
  });

  describe('Initialization for Player 1', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 1);
      fixture.detectChanges();
    });

    it('should subscribe to player1NameObservable', () => {
      player1NameSubject.next('Player 1');
      expect(component.playerName()).toBe('Player 1');
    });

    it('should update playerName when player1NameObservable emits', () => {
      player1NameSubject.next('John Doe');
      expect(component.playerName()).toBe('John Doe');
    });

    it('should reflect player1Score from signal', () => {
      mockPlayer1Score.set(500);
      expect(component.score()).toBe(500);
    });

    it('should reflect roundScore from signal', () => {
      mockRoundScore.set(300);
      expect(component.roundScore()).toBe(300);
    });

    it('should reflect selectedScore from signal', () => {
      mockSelectedScore.set(150);
      expect(component.selectedScore()).toBe(150);
    });

    it('should update targetScore when targetScoreObservable emits', () => {
      targetScoreSubject.next(3000);
      expect(component.targetScore()).toBe(3000);
    });

    it('should subscribe to currentPlayer signal', () => {
      expect(component.isCurrentPlayer()).toBe(true);
    });

    it('should update isCurrentPlayer when currentPlayer signal changes', () => {
      expect(component.isCurrentPlayer()).toBe(true);
      mockCurrentPlayer.set(2);
      expect(component.isCurrentPlayer()).toBe(false);
    });
  });

  describe('Initialization for Player 2', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 2);
      fixture.detectChanges();
    });

    it('should subscribe to player2NameObservable', () => {
      player2NameSubject.next('Player 2');
      expect(component.playerName()).toBe('Player 2');
    });

    it('should reflect player2Score from signal', () => {
      mockPlayer2Score.set(750);
      expect(component.score()).toBe(750);
    });

    it('should show isCurrentPlayer as false when player 1 is current', () => {
      expect(component.isCurrentPlayer()).toBe(false);
    });

    it('should show isCurrentPlayer as true when player 2 becomes current', () => {
      mockCurrentPlayer.set(2);
      expect(component.isCurrentPlayer()).toBe(true);
    });
  });

  describe('Dynamic signal reactivity', () => {
    it('should switch isCurrentPlayer based on currentPlayer signal', () => {
      fixture.componentRef.setInput('playerId', 1);
      fixture.detectChanges();

      expect(component.isCurrentPlayer()).toBe(true);
      mockCurrentPlayer.set(2);
      expect(component.isCurrentPlayer()).toBe(false);
      mockCurrentPlayer.set(1);
      expect(component.isCurrentPlayer()).toBe(true);
    });
  });
});
