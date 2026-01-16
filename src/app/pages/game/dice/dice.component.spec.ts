import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DiceComponent, DiceSelectedData} from './dice.component';

describe('DiceComponent', () => {
  let component: DiceComponent;
  let fixture: ComponentFixture<DiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should have default faces value', () => {
      expect(component.faces).toBe(5);
    });

    it('should have default selected value as false', () => {
      expect(component.selected).toBe(false);
    });

    it('should have default locked value as false', () => {
      expect(component.locked).toBe(false);
    });

    it('should have default wasSelected value as false', () => {
      expect(component.wasSelected).toBe(false);
    });

    it('should accept faces value from 1 to 6', () => {
      const validFaces = [1, 2, 3, 4, 5, 6];
      validFaces.forEach(face => {
        const faceValue = face as 1 | 2 | 3 | 4 | 5 | 6;
        component.faces = faceValue;
        expect(component.faces).toBe(faceValue);
      });
    });

    it('should accept selected property', () => {
      component.selected = true;
      expect(component.selected).toBe(true);
      component.selected = false;
      expect(component.selected).toBe(false);
    });

    it('should accept locked property', () => {
      component.locked = true;
      expect(component.locked).toBe(true);
      component.locked = false;
      expect(component.locked).toBe(false);
    });

    it('should accept wasSelected property', () => {
      component.wasSelected = true;
      expect(component.wasSelected).toBe(true);
      component.wasSelected = false;
      expect(component.wasSelected).toBe(false);
    });
  });

  describe('changeStatus', () => {
    it('should toggle selected when not locked', () => {
      component.selected = false;
      component.locked = false;

      const event = new Event('click');
      spyOn(event, 'preventDefault');

      component.changeStatus(event);
      expect(component.selected).toBe(true);

      component.changeStatus(event);
      expect(component.selected).toBe(false);
    });

    it('should not toggle selected when locked', () => {
      component.selected = false;
      component.locked = true;

      const event = new Event('click');
      component.changeStatus(event);

      expect(component.selected).toBe(false);
    });

    it('should prevent default event behavior', () => {
      const event = new Event('click');
      spyOn(event, 'preventDefault');

      component.changeStatus(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should emit diceSelectedEvt when toggled', () => {
      component.selected = false;
      component.locked = false;
      component.faces = 3;

      spyOn(component.diceSelectedEvt, 'emit');

      const event = new Event('click');
      component.changeStatus(event);

      expect(component.diceSelectedEvt.emit).toHaveBeenCalled();
    });

    it('should emit correct data in diceSelectedEvt', (done) => {
      component.faces = 4;
      component.selected = false;
      component.locked = false;

      component.diceSelectedEvt.subscribe((data: DiceSelectedData) => {
        expect(data.faces).toBe(4);
        done();
      });

      const event = new Event('click');
      component.changeStatus(event);
    });
  });

  describe('locked state behavior', () => {
    it('should prevent selection when locked is true', () => {
      component.locked = true;
      component.selected = false;

      const event = new Event('click');
      component.changeStatus(event);

      expect(component.selected).toBe(false);
    });

    it('should allow selection when locked is false', () => {
      component.locked = false;
      component.selected = false;

      const event = new Event('click');
      component.changeStatus(event);

      expect(component.selected).toBe(true);
    });

    it('should not emit event when attempting to change locked dice', () => {
      component.locked = true;
      spyOn(component.diceSelectedEvt, 'emit');

      const event = new Event('click');
      component.changeStatus(event);

      expect(component.diceSelectedEvt.emit).not.toHaveBeenCalled();
    });
  });

  describe('diceSelectedEvt output', () => {
    it('should emit DiceSelectedData interface', (done) => {
      component.faces = 2;
      component.selected = false;
      component.locked = false;

      component.diceSelectedEvt.subscribe((data: DiceSelectedData) => {
        expect(data).toEqual(jasmine.objectContaining({
          faces: 2
        }));
        done();
      });

      const event = new Event('click');
      component.changeStatus(event);
    });

    it('should not emit when locked', () => {
      component.locked = true;
      let emitCount = 0;

      component.diceSelectedEvt.subscribe(() => {
        emitCount++;
      });

      const event = new Event('click');
      component.changeStatus(event);

      expect(emitCount).toBe(0);
    });
  });

  describe('Integration tests', () => {
    it('should handle complete lifecycle: create, select, lock, reset', () => {
      // Create
      expect(component).toBeTruthy();

      // Select
      component.selected = false;
      component.locked = false;
      const event = new Event('click');
      component.changeStatus(event);
      expect(component.selected).toBe(true);

      // Lock
      component.locked = true;
      component.changeStatus(event);
      expect(component.selected).toBe(true); // Should remain selected, not toggle

      // Reset
      component.selected = false;
      component.locked = false;
      component.wasSelected = false;
      expect(component.selected).toBe(false);
      expect(component.locked).toBe(false);
      expect(component.wasSelected).toBe(false);
    });

    it('should properly represent state with all flags', () => {
      component.selected = true;
      component.locked = true;
      component.wasSelected = true;

      expect(component.selected).toBe(true);
      expect(component.locked).toBe(true);
      expect(component.wasSelected).toBe(true);
    });
  });
});
