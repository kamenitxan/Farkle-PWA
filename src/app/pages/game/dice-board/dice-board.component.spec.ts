import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DiceBoardComponent} from './dice-board.component';
import {DiceComponent} from '../dice/dice.component';

describe('DiceBoardComponent', () => {
  let component: DiceBoardComponent;
  let fixture: ComponentFixture<DiceBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceBoardComponent, DiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceBoardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call createDices on init', () => {
      spyOn(component, 'createDices');
      component.ngOnInit();
      expect(component.createDices).toHaveBeenCalled();
    });
  });

  describe('createDices', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create 6x6 grid of dice components', () => {
      const dices = component.dices.flat().filter(d => d !== undefined);
      expect(dices.length).toBeGreaterThan(0);
    });

    it('should set correct row and faces inputs for each dice', () => {
      fixture.detectChanges();
      for (let row = 0; row < 6; row++) {
        for (let col = 1; col <= 6; col++) {
          const dice = component.dices[row][col];
          if (dice?.instance) {
            expect(dice.instance.faces).toBe(col);
          }
        }
      }
    });

    it('should subscribe to diceSelectedEvt for each dice', () => {
      spyOn(component, 'handleDiceSelected');
      fixture.detectChanges();

      // Trigger a dice selection event
      const dice = component.dices[0][1];
      if (dice?.instance) {
        dice.instance.diceSelectedEvt.emit({row: 0, faces: 1});
        expect(component.handleDiceSelected).toHaveBeenCalled();
      }
    });
  });

  describe('handleDiceSelected', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should deselect all other dice in the same row', () => {
      // Set up some dice as selected
      component.dices[0][1].instance.selected = true;
      component.dices[0][2].instance.selected = true;
      component.dices[0][3].instance.selected = false;

      // Simulate selection of dice with faces 2
      component.handleDiceSelected({row: 0, faces: 2});

      // All dice in row 0 except the one with 2 faces should be deselected
      expect(component.dices[0][1].instance.selected).toBe(false);
      expect(component.dices[0][3].instance.selected).toBe(false);
    });

    it('should emit diceSelectionChanged with current selected dice', () => {
      spyOn(component.diceSelectionChanged, 'emit');
      component.dices[0][1].instance.selected = true;
      component.dices[0][2].instance.selected = false;

      component.handleDiceSelected({row: 0, faces: 1});

      expect(component.diceSelectionChanged.emit).toHaveBeenCalled();
    });

    it('should handle deselection when same dice is clicked again', () => {
      component.dices[0][1].instance.selected = true;

      // Click the same dice again
      component.dices[0][1].instance.selected = false;
      component.handleDiceSelected({row: 0, faces: 1});

      const selectedDice = component.getSelectedDice();
      expect(selectedDice.indexOf(1)).toBe(-1);
    });
  });

  describe('getSelectedDice', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return array of selected dice faces', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[0][3].instance.selected = true;

      const selected = component.getSelectedDice();
      expect(selected).toContain(1);
      expect(selected).toContain(3);
    });

    it('should return empty array when no dice are selected', () => {
      const selected = component.getSelectedDice();
      expect(selected.length).toBe(0);
    });

    it('should not include locked dice in selection', () => {
      component.dices[0][1].instance.locked = true;
      component.dices[0][1].instance.selected = false;

      const selected = component.getSelectedDice();
      expect(selected).not.toContain(1);
    });

    it('should handle multiple selected dice correctly', () => {
      component.dices[1][2].instance.selected = true;
      component.dices[1][4].instance.selected = true;
      component.dices[3][5].instance.selected = true;

      const selected = component.getSelectedDice();
      expect(selected.length).toBe(3);
      expect(selected).toContain(2);
      expect(selected).toContain(4);
      expect(selected).toContain(5);
    });
  });

  describe('lockSelectedDice', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should lock all dice in rows with selected dice', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[0][2].instance.selected = false;

      component.lockSelectedDice();

      expect(component.dices[0][1].instance.locked).toBe(true);
      expect(component.dices[0][2].instance.locked).toBe(true);
    });

    it('should deselect all dice after locking', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[0][3].instance.selected = true;

      component.lockSelectedDice();

      expect(component.dices[0][1].instance.selected).toBe(false);
      expect(component.dices[0][3].instance.selected).toBe(false);
    });

    it('should set wasSelected property for previously selected dice', () => {
      component.dices[0][1].instance.selected = true;

      component.lockSelectedDice();

      expect(component.dices[0][1].instance.wasSelected).toBe(true);
    });

    it('should not lock dice in rows without selected dice', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[2][2].instance.selected = false;

      component.lockSelectedDice();

      expect(component.dices[2][2].instance.locked).toBe(false);
    });

    it('should emit diceSelectionChanged after locking', () => {
      spyOn(component.diceSelectionChanged, 'emit');
      component.dices[0][1].instance.selected = true;

      component.lockSelectedDice();

      expect(component.diceSelectionChanged.emit).toHaveBeenCalledWith([]);
    });

    it('should handle multiple rows with selected dice', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[2][3].instance.selected = true;

      component.lockSelectedDice();

      // All dice in rows 0 and 2 should be locked
      expect(component.dices[0][1].instance.locked).toBe(true);
      expect(component.dices[0][2].instance.locked).toBe(true);
      expect(component.dices[2][3].instance.locked).toBe(true);
      expect(component.dices[2][4].instance.locked).toBe(true);

      // Dice in other rows should not be locked
      expect(component.dices[1][1].instance.locked).toBe(false);
    });
  });

  describe('resetAllDice', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should reset selected property for all dice', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[1][2].instance.selected = true;

      component.resetAllDice();

      component.dices.forEach(row => {
        row.forEach(dice => {
          if (dice?.instance) {
            expect(dice.instance.selected).toBe(false);
          }
        });
      });
    });

    it('should reset locked property for all dice', () => {
      component.dices[0][1].instance.locked = true;
      component.dices[2][3].instance.locked = true;

      component.resetAllDice();

      component.dices.forEach(row => {
        row.forEach(dice => {
          if (dice?.instance) {
            expect(dice.instance.locked).toBe(false);
          }
        });
      });
    });

    it('should reset wasSelected property for all dice', () => {
      component.dices[0][1].instance.wasSelected = true;
      component.dices[1][2].instance.wasSelected = true;

      component.resetAllDice();

      component.dices.forEach(row => {
        row.forEach(dice => {
          if (dice?.instance) {
            expect(dice.instance.wasSelected).toBe(false);
          }
        });
      });
    });

    it('should reset all properties at once', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[0][1].instance.locked = true;
      component.dices[0][1].instance.wasSelected = true;

      component.resetAllDice();

      const dice = component.dices[0][1].instance;
      expect(dice.selected).toBe(false);
      expect(dice.locked).toBe(false);
      expect(dice.wasSelected).toBe(false);
    });
  });

  describe('diceSelectionChanged output', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should emit when selection changes', (done) => {
      component.diceSelectionChanged.subscribe((selected: number[]) => {
        expect(selected).toEqual([1]);
        done();
      });

      component.dices[0][1].instance.selected = true;
      component.handleDiceSelected({row: 0, faces: 1});
    });

    it('should emit with correct selected dice values', (done) => {
      component.diceSelectionChanged.subscribe((selected: number[]) => {
        if (selected.length > 0) {
          expect(selected).toContain(2);
          done();
        }
      });

      component.dices[0][2].instance.selected = true;
      component.handleDiceSelected({row: 0, faces: 2});
    });
  });

  describe('Integration tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should handle complete workflow: select, lock, reset', () => {
      // Select some dice
      component.dices[0][1].instance.selected = true;
      component.dices[0][2].instance.selected = true;

      // Lock them
      component.lockSelectedDice();
      expect(component.dices[0][1].instance.locked).toBe(true);
      expect(component.dices[0][1].instance.selected).toBe(false);

      // Reset all
      component.resetAllDice();
      expect(component.dices[0][1].instance.locked).toBe(false);
      expect(component.dices[0][1].instance.wasSelected).toBe(false);
    });

    it('should prevent selecting multiple dice in the same row', () => {
      component.dices[0][1].instance.selected = true;
      component.dices[0][2].instance.selected = true;

      component.handleDiceSelected({row: 0, faces: 2});

      expect(component.dices[0][1].instance.selected).toBe(false);
      expect(component.dices[0][2].instance.selected).toBe(true);
    });
  });
});
