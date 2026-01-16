import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ScoreboardComponent} from './scoreboard.component';
import {SettingsService} from '../../../services/settings.service';
import {ScoreKeeperService} from '../../../services/score-keeper.service';
import {BehaviorSubject} from 'rxjs';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  // Mock Observables
  let player1NameSubject: BehaviorSubject<string>;
  let player2NameSubject: BehaviorSubject<string>;
  let player1ScoreSubject: BehaviorSubject<number>;
  let player2ScoreSubject: BehaviorSubject<number>;
  let roundScoreSubject: BehaviorSubject<number>;
  let selectedScoreSubject: BehaviorSubject<number>;
  let targetScoreSubject: BehaviorSubject<number>;
  let currentPlayerSubject: BehaviorSubject<1 | 2>;

  beforeEach(async () => {
    // Create subject instances
    player1NameSubject = new BehaviorSubject<string>('Player 1');
    player2NameSubject = new BehaviorSubject<string>('Player 2');
    player1ScoreSubject = new BehaviorSubject<number>(0);
    player2ScoreSubject = new BehaviorSubject<number>(0);
    roundScoreSubject = new BehaviorSubject<number>(0);
    selectedScoreSubject = new BehaviorSubject<number>(0);
    targetScoreSubject = new BehaviorSubject<number>(2000);
    currentPlayerSubject = new BehaviorSubject<1 | 2>(1);

    // Create mock services
    const mockSettingsService = {
      player1NameObservable: player1NameSubject.asObservable(),
      player2NameObservable: player2NameSubject.asObservable(),
      targetScoreObservable: targetScoreSubject.asObservable()
    };

    const mockScoreKeeperService = {
      player1ScoreObservable: player1ScoreSubject.asObservable(),
      player2ScoreObservable: player2ScoreSubject.asObservable(),
      roundScoreObservable: roundScoreSubject.asObservable(),
      selectedScoreObservable: selectedScoreSubject.asObservable(),
      currentPlayerObservable: currentPlayerSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [ScoreboardComponent],
      providers: [
        {provide: SettingsService, useValue: mockSettingsService},
        {provide: ScoreKeeperService, useValue: mockScoreKeeperService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
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

  describe('Initialization for Player 1', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 1);
      fixture.detectChanges();
    });

    it('should subscribe to player1NameObservable', (done) => {
      setTimeout(() => {
        expect(component.playerName).toBe('Player 1');
        done();
      }, 10);
    });

    it('should subscribe to player1ScoreObservable', (done) => {
      setTimeout(() => {
        expect(component.score).toBe(0);
        done();
      }, 10);
    });

    it('should update playerName when player1NameObservable emits', (done) => {
      setTimeout(() => {
        player1NameSubject.next('John Doe');
        setTimeout(() => {
          expect(component.playerName).toBe('John Doe');
          done();
        }, 10);
      }, 10);
    });

    it('should update score when player1ScoreObservable emits', (done) => {
      setTimeout(() => {
        player1ScoreSubject.next(500);
        setTimeout(() => {
          expect(component.score).toBe(500);
          done();
        }, 10);
      }, 10);
    });
  });

  describe('Initialization for Player 2', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 2);
      fixture.detectChanges();
    });

    it('should subscribe to player2NameObservable', (done) => {
      setTimeout(() => {
        expect(component.playerName).toBe('Player 2');
        done();
      }, 10);
    });

    it('should subscribe to player2ScoreObservable', (done) => {
      setTimeout(() => {
        expect(component.score).toBe(0);
        done();
      }, 10);
    });

    it('should update playerName when player2NameObservable emits', (done) => {
      setTimeout(() => {
        player2NameSubject.next('Jane Doe');
        setTimeout(() => {
          expect(component.playerName).toBe('Jane Doe');
          done();
        }, 10);
      }, 10);
    });

    it('should update score when player2ScoreObservable emits', (done) => {
      setTimeout(() => {
        player2ScoreSubject.next(750);
        setTimeout(() => {
          expect(component.score).toBe(750);
          done();
        }, 10);
      }, 10);
    });
  });

  describe('Common subscriptions', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 1);
      fixture.detectChanges();
    });

    it('should subscribe to roundScoreObservable', (done) => {
      setTimeout(() => {
        expect(component.roundScore).toBe(0);
        done();
      }, 10);
    });

    it('should update roundScore when roundScoreObservable emits', (done) => {
      setTimeout(() => {
        roundScoreSubject.next(300);
        setTimeout(() => {
          expect(component.roundScore).toBe(300);
          done();
        }, 10);
      }, 10);
    });

    it('should subscribe to selectedScoreObservable', (done) => {
      setTimeout(() => {
        expect(component.selectedScore).toBe(0);
        done();
      }, 10);
    });

    it('should update selectedScore when selectedScoreObservable emits', (done) => {
      setTimeout(() => {
        selectedScoreSubject.next(200);
        setTimeout(() => {
          expect(component.selectedScore).toBe(200);
          done();
        }, 10);
      }, 10);
    });

    it('should subscribe to targetScoreObservable', (done) => {
      setTimeout(() => {
        expect(component.targetScore).toBe(2000);
        done();
      }, 10);
    });

    it('should update targetScore when targetScoreObservable emits', (done) => {
      setTimeout(() => {
        targetScoreSubject.next(3000);
        setTimeout(() => {
          expect(component.targetScore).toBe(3000);
          done();
        }, 10);
      }, 10);
    });

    it('should subscribe to currentPlayerObservable', (done) => {
      setTimeout(() => {
        expect(component.isCurrentPlayer).toBe(true);
        done();
      }, 10);
    });

    it('should update isCurrentPlayer when currentPlayerObservable emits', (done) => {
      setTimeout(() => {
        expect(component.isCurrentPlayer).toBe(true);
        currentPlayerSubject.next(2);
        setTimeout(() => {
          expect(component.isCurrentPlayer).toBe(false);
          done();
        }, 10);
      }, 10);
    });
  });

  describe('Default property values', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('playerId', 1);
    });

    it('should have playerName initialized as empty string', () => {
      expect(component.playerName).toBe('');
    });

    it('should have score initialized as 0', () => {
      expect(component.score).toBe(0);
    });

    it('should have roundScore initialized as 0', () => {
      expect(component.roundScore).toBe(0);
    });

    it('should have selectedScore initialized as 0', () => {
      expect(component.selectedScore).toBe(0);
    });

    it('should have targetScore initialized as 2000', () => {
      expect(component.targetScore).toBe(2000);
    });

    it('should have isCurrentPlayer initialized as false', () => {
      expect(component.isCurrentPlayer).toBe(false);
    });
  });

  describe('Integration tests', () => {
    it('should handle Player 1 with full data flow', (done) => {
      fixture.componentRef.setInput('playerId', 1);
      fixture.detectChanges();

      setTimeout(() => {
        player1NameSubject.next('John');
        player1ScoreSubject.next(500);
        roundScoreSubject.next(100);
        selectedScoreSubject.next(50);
        targetScoreSubject.next(2500);

        setTimeout(() => {
          expect(component.playerName).toBe('John');
          expect(component.score).toBe(500);
          expect(component.roundScore).toBe(100);
          expect(component.selectedScore).toBe(50);
          expect(component.targetScore).toBe(2500);
          done();
        }, 10);
      }, 10);
    });

    it('should handle Player 2 with full data flow', (done) => {
      fixture.componentRef.setInput('playerId', 2);
      fixture.detectChanges();

      setTimeout(() => {
        player2NameSubject.next('Jane');
        player2ScoreSubject.next(750);
        roundScoreSubject.next(200);
        selectedScoreSubject.next(100);
        targetScoreSubject.next(3000);

        setTimeout(() => {
          expect(component.playerName).toBe('Jane');
          expect(component.score).toBe(750);
          expect(component.roundScore).toBe(200);
          expect(component.selectedScore).toBe(100);
          expect(component.targetScore).toBe(3000);
          done();
        }, 10);
      }, 10);
    });

    it('should switch isCurrentPlayer based on currentPlayerObservable', (done) => {
      fixture.componentRef.setInput('playerId', 1);
      fixture.detectChanges();

      setTimeout(() => {
        expect(component.isCurrentPlayer).toBe(true);
        currentPlayerSubject.next(2);

        setTimeout(() => {
          expect(component.isCurrentPlayer).toBe(false);
          currentPlayerSubject.next(1);

          setTimeout(() => {
            expect(component.isCurrentPlayer).toBe(true);
            done();
          }, 10);
        }, 10);
      }, 10);
    });
  });
});
