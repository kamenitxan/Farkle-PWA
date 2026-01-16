import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GameComponent} from './game.component';
import {ScoreCalculatorService} from '../../services/score-calculator.service';
import {ScoreKeeperService} from '../../services/score-keeper.service';
import {SettingsService} from '../../services/settings.service';
import {MatDialog} from '@angular/material/dialog';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let scoreCalculatorService: jasmine.SpyObj<ScoreCalculatorService>;
  let scoreKeeperService: jasmine.SpyObj<ScoreKeeperService>;
  let settingsService: jasmine.SpyObj<SettingsService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    // Clear localStorage before each test
    localStorage.clear();

    // Create spies for services
    const scoreCalculatorSpy = jasmine.createSpyObj('ScoreCalculatorService', ['calculateScore']);
    const scoreKeeperSpy = jasmine.createSpyObj('ScoreKeeperService', [
      'updateRoundScore',
      'getRoundScore',
      'addToPlayerScore',
      'resetRoundScore',
      'updateSelectedScore',
      'updateCurrentPlayer',
      'resetAllScores',
      'getPlayerScore'
    ]);
    const settingsSpy = jasmine.createSpyObj('SettingsService', ['getTargetScore'], {
      player1NameObservable: {
        subscribe: () => ({
          unsubscribe: () => {
          }
        })
      },
      player2NameObservable: {
        subscribe: () => ({
          unsubscribe: () => {
          }
        })
      },
      targetScoreObservable: {
        subscribe: () => ({
          unsubscribe: () => {
          }
        })
      }
    });
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    // Setup observables for ScoreKeeperService
    scoreKeeperSpy.currentPlayerObservable = jasmine.createSpyObj('Observable', ['subscribe']);
    scoreKeeperSpy.currentPlayerObservable.subscribe.and.callFake((callback: any) => {
      callback(1);
      return {
        unsubscribe: () => {
        }
      };
    });

    scoreKeeperSpy.player1ScoreObservable = jasmine.createSpyObj('Observable', ['subscribe']);
    scoreKeeperSpy.player1ScoreObservable.subscribe.and.returnValue({
      unsubscribe: () => {
      }
    });

    scoreKeeperSpy.player2ScoreObservable = jasmine.createSpyObj('Observable', ['subscribe']);
    scoreKeeperSpy.player2ScoreObservable.subscribe.and.returnValue({
      unsubscribe: () => {
      }
    });

    scoreKeeperSpy.roundScoreObservable = jasmine.createSpyObj('Observable', ['subscribe']);
    scoreKeeperSpy.roundScoreObservable.subscribe.and.returnValue({
      unsubscribe: () => {
      }
    });

    scoreKeeperSpy.selectedScoreObservable = jasmine.createSpyObj('Observable', ['subscribe']);
    scoreKeeperSpy.selectedScoreObservable.subscribe.and.returnValue({
      unsubscribe: () => {
      }
    });

    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        {provide: ScoreCalculatorService, useValue: scoreCalculatorSpy},
        {provide: ScoreKeeperService, useValue: scoreKeeperSpy},
        {provide: SettingsService, useValue: settingsSpy},
        {provide: MatDialog, useValue: dialogSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;

    scoreCalculatorService = TestBed.inject(ScoreCalculatorService) as jasmine.SpyObj<ScoreCalculatorService>;
    scoreKeeperService = TestBed.inject(ScoreKeeperService) as jasmine.SpyObj<ScoreKeeperService>;
    settingsService = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with currentPlayer = 1', () => {
    expect(component.currentPlayer).toBe(1);
  });

  it('should initialize with selectedScore = 0', () => {
    expect(component.selectedScore).toBe(0);
  });

  describe('handleDiceSelectionChanged', () => {
    it('should update selectedScore when dice are selected with valid score', () => {
      const selectedDice = [1, 1, 1];
      scoreCalculatorService.calculateScore.and.returnValue(1000);

      component.handleDiceSelectionChanged(selectedDice);

      expect(component.selectedScore).toBe(1000);
      expect(scoreCalculatorService.calculateScore).toHaveBeenCalledWith(selectedDice);
      expect(scoreKeeperService.updateSelectedScore).toHaveBeenCalledWith(1000);
    });

    it('should set selectedScore to 0 when no dice are selected', () => {
      const selectedDice: number[] = [];

      component.handleDiceSelectionChanged(selectedDice);

      expect(component.selectedScore).toBe(0);
      expect(scoreKeeperService.updateSelectedScore).toHaveBeenCalledWith(0);
    });

    it('should set selectedScore to 0 when selected dice have no score', () => {
      const selectedDice = [2, 3, 4];
      scoreCalculatorService.calculateScore.and.returnValue(0);

      component.handleDiceSelectionChanged(selectedDice);

      expect(component.selectedScore).toBe(0);
      expect(scoreKeeperService.updateSelectedScore).toHaveBeenCalledWith(0);
    });
  });

  describe('handleRollAgain', () => {
    beforeEach(() => {
      // Create a mock DiceBoardComponent
      component.diceBoard = jasmine.createSpyObj('DiceBoardComponent', [
        'getSelectedDice',
        'lockSelectedDice',
        'resetAllDice'
      ]) as any;
    });

    it('should update round score and lock selected dice', () => {
      const selectedDice = [1, 5];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(150);

      component.handleRollAgain();

      expect(scoreKeeperService.updateRoundScore).toHaveBeenCalledWith(150);
      expect(component.diceBoard!.lockSelectedDice).toHaveBeenCalled();
      expect(component.selectedScore).toBe(0);
      expect(scoreKeeperService.updateSelectedScore).toHaveBeenCalledWith(0);
    });

    it('should warn and return early when no dice are selected', () => {
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue([]);
      spyOn(console, 'warn');

      component.handleRollAgain();

      expect(console.warn).toHaveBeenCalledWith('No dice selected!');
      expect(scoreKeeperService.updateRoundScore).not.toHaveBeenCalled();
    });

    it('should reset selectedScore to 0 after locking dice', () => {
      const selectedDice = [1, 1, 1];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(1000);
      component.selectedScore = 1000;

      component.handleRollAgain();

      expect(component.selectedScore).toBe(0);
    });
  });

  describe('handleEndRound - Farkle scenario', () => {
    beforeEach(() => {
      component.diceBoard = jasmine.createSpyObj('DiceBoardComponent', [
        'getSelectedDice',
        'resetAllDice'
      ]) as any;
      settingsService.getTargetScore.and.returnValue(2000);
      scoreKeeperService.getPlayerScore.and.returnValue(0);
    });

    it('should handle Farkle (score = 0) and switch player', () => {
      const selectedDice = [2, 3, 4];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(0);
      component.currentPlayer = 1;

      component.handleEndRound();

      expect(scoreKeeperService.resetRoundScore).toHaveBeenCalled();
      expect(scoreKeeperService.updateSelectedScore).toHaveBeenCalledWith(0);
      expect(component.diceBoard!.resetAllDice).toHaveBeenCalled();
      expect(component.selectedScore).toBe(0);
      expect(scoreKeeperService.updateCurrentPlayer).toHaveBeenCalledWith(2);
      // Should NOT add score to player
      expect(scoreKeeperService.addToPlayerScore).not.toHaveBeenCalled();
    });

    it('should not add round score to player score on Farkle', () => {
      const selectedDice = [2, 2, 3];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(0);

      component.handleEndRound();

      expect(scoreKeeperService.addToPlayerScore).not.toHaveBeenCalled();
    });
  });

  describe('handleEndRound - successful round', () => {
    beforeEach(() => {
      component.diceBoard = jasmine.createSpyObj('DiceBoardComponent', [
        'getSelectedDice',
        'resetAllDice'
      ]) as any;
      settingsService.getTargetScore.and.returnValue(2000);
      scoreKeeperService.getPlayerScore.and.returnValue(500);
    });

    it('should add round score to player score and switch player', () => {
      const selectedDice = [1, 5];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(150);
      scoreKeeperService.getRoundScore.and.returnValue(350);
      component.currentPlayer = 1;

      component.handleEndRound();

      expect(scoreKeeperService.updateRoundScore).toHaveBeenCalledWith(150);
      expect(scoreKeeperService.addToPlayerScore).toHaveBeenCalledWith(1, 350);
      expect(scoreKeeperService.resetRoundScore).toHaveBeenCalled();
      expect(component.diceBoard!.resetAllDice).toHaveBeenCalled();
      expect(component.selectedScore).toBe(0);
      expect(scoreKeeperService.updateCurrentPlayer).toHaveBeenCalledWith(2);
    });

    it('should switch from player 2 to player 1', () => {
      const selectedDice = [1];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(100);
      scoreKeeperService.getRoundScore.and.returnValue(100);
      component.currentPlayer = 2;

      component.handleEndRound();

      expect(scoreKeeperService.addToPlayerScore).toHaveBeenCalledWith(2, 100);
      expect(scoreKeeperService.updateCurrentPlayer).toHaveBeenCalledWith(1);
    });

    it('should reset selectedScore and update service after ending round', () => {
      const selectedDice = [5, 5, 5];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(500);
      scoreKeeperService.getRoundScore.and.returnValue(500);
      component.selectedScore = 500;

      component.handleEndRound();

      expect(component.selectedScore).toBe(0);
      expect(scoreKeeperService.updateSelectedScore).toHaveBeenCalledWith(0);
    });
  });

  describe('winner detection', () => {
    beforeEach(() => {
      component.diceBoard = jasmine.createSpyObj('DiceBoardComponent', [
        'getSelectedDice',
        'resetAllDice'
      ]) as any;
    });

    it('should open winner dialog when player 1 reaches target score', () => {
      const selectedDice = [1];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(100);
      scoreKeeperService.getRoundScore.and.returnValue(100);
      settingsService.getTargetScore.and.returnValue(2000);
      scoreKeeperService.getPlayerScore.and.returnValues(2000, 1000);

      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue({
        subscribe: () => {
        }
      } as any);
      matDialog.open.and.returnValue(dialogRefSpy);

      component.currentPlayer = 1;

      component.handleEndRound();

      expect(matDialog.open).toHaveBeenCalled();
      expect(scoreKeeperService.updateCurrentPlayer).not.toHaveBeenCalled();
    });

    it('should open winner dialog when player 2 reaches target score', () => {
      const selectedDice = [5];
      (component.diceBoard!.getSelectedDice as jasmine.Spy).and.returnValue(selectedDice);
      scoreCalculatorService.calculateScore.and.returnValue(50);
      scoreKeeperService.getRoundScore.and.returnValue(50);
      settingsService.getTargetScore.and.returnValue(2000);
      scoreKeeperService.getPlayerScore.and.returnValues(1000, 2100);

      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      dialogRefSpy.afterClosed.and.returnValue({
        subscribe: () => {
        }
      } as any);
      matDialog.open.and.returnValue(dialogRefSpy);

      component.currentPlayer = 2;

      component.handleEndRound();

      expect(matDialog.open).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle handleRollAgain when diceBoard is undefined', () => {
      component.diceBoard = undefined;

      expect(() => component.handleRollAgain()).not.toThrow();
      expect(scoreKeeperService.updateRoundScore).not.toHaveBeenCalled();
    });

    it('should handle handleEndRound when diceBoard is undefined', () => {
      component.diceBoard = undefined;

      expect(() => component.handleEndRound()).not.toThrow();
      expect(scoreKeeperService.updateRoundScore).not.toHaveBeenCalled();
    });
  });
});
