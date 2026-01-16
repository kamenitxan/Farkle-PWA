import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ControlsComponent} from './controls.component';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should have default selectedScore value of 0', () => {
      expect(component.selectedScore()).toBe(0);
    });

    it('should accept selectedScore input', () => {
      fixture.componentRef.setInput('selectedScore', 500);
      expect(component.selectedScore()).toBe(500);
    });

    it('should update selectedScore when input changes', () => {
      fixture.componentRef.setInput('selectedScore', 100);
      expect(component.selectedScore()).toBe(100);

      fixture.componentRef.setInput('selectedScore', 1000);
      expect(component.selectedScore()).toBe(1000);
    });
  });

  describe('Output events', () => {
    it('should have endRoundEvt output', () => {
      expect(component.endRoundEvt).toBeDefined();
    });

    it('should have rollAgainEvt output', () => {
      expect(component.rollAgainEvt).toBeDefined();
    });
  });

  describe('endRound method', () => {
    it('should emit endRoundEvt when called', () => {
      spyOn(component.endRoundEvt, 'emit');
      component.endRound();
      expect(component.endRoundEvt.emit).toHaveBeenCalled();
    });

    it('should emit endRoundEvt without any data', () => {
      spyOn(component.endRoundEvt, 'emit');
      component.endRound();
      expect(component.endRoundEvt.emit).toHaveBeenCalled();
      // No payload is emitted, so we only verify the call
    });

    it('should be callable multiple times', () => {
      spyOn(component.endRoundEvt, 'emit');
      component.endRound();
      component.endRound();
      component.endRound();
      expect(component.endRoundEvt.emit).toHaveBeenCalledTimes(3);
    });
  });

  describe('rollAgain method', () => {
    it('should emit rollAgainEvt when called', () => {
      spyOn(component.rollAgainEvt, 'emit');
      component.rollAgain();
      expect(component.rollAgainEvt.emit).toHaveBeenCalled();
    });

    it('should emit rollAgainEvt without any data', () => {
      spyOn(component.rollAgainEvt, 'emit');
      component.rollAgain();
      expect(component.rollAgainEvt.emit).toHaveBeenCalled();
      // No payload is emitted, so we only verify the call
    });

    it('should be callable multiple times', () => {
      spyOn(component.rollAgainEvt, 'emit');
      component.rollAgain();
      component.rollAgain();
      expect(component.rollAgainEvt.emit).toHaveBeenCalledTimes(2);
    });
  });

  describe('Integration tests', () => {
    it('should be able to set selectedScore and call endRound', () => {
      spyOn(component.endRoundEvt, 'emit');

      fixture.componentRef.setInput('selectedScore', 250);
      expect(component.selectedScore()).toBe(250);

      component.endRound();
      expect(component.endRoundEvt.emit).toHaveBeenCalled();
    });

    it('should be able to call both endRound and rollAgain', () => {
      spyOn(component.endRoundEvt, 'emit');
      spyOn(component.rollAgainEvt, 'emit');

      component.rollAgain();
      expect(component.rollAgainEvt.emit).toHaveBeenCalled();

      component.endRound();
      expect(component.endRoundEvt.emit).toHaveBeenCalled();
    });

    it('should handle selectedScore of 0', () => {
      fixture.componentRef.setInput('selectedScore', 0);
      expect(component.selectedScore()).toBe(0);

      component.endRound();
      // Component should still work even with 0 score
      expect(component).toBeTruthy();
    });

    it('should handle large selectedScore values', () => {
      fixture.componentRef.setInput('selectedScore', 10000);
      expect(component.selectedScore()).toBe(10000);
    });
  });
});
