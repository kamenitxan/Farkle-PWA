import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WinnerDialogComponent} from './winner-dialog.component';

describe('WinnerDialogComponent', () => {
  let component: WinnerDialogComponent;
  let fixture: ComponentFixture<WinnerDialogComponent>;

  const mockDialogData = {
    winner: 1 as const,
    score: 2500
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WinnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Dialog data injection', () => {
    it('should inject MAT_DIALOG_DATA', () => {
      expect(component.data).toBeDefined();
    });

    it('should have winner property in data', () => {
      expect(component.data.winner).toBe(1);
    });

    it('should have score property in data', () => {
      expect(component.data.score).toBe(2500);
    });

    it('should type winner as 1 | 2', () => {
      expect([1, 2]).toContain(component.data.winner);
    });
  });

  describe('Different winner scenarios', () => {
    it('should handle winner as player 1', async () => {
      const data = {winner: 1 as const, score: 3000};
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [WinnerDialogComponent],
        providers: [
          {provide: MAT_DIALOG_DATA, useValue: data}
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(WinnerDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.data.winner).toBe(1);
      expect(component.data.score).toBe(3000);
    });

    it('should handle winner as player 2', async () => {
      const data = {winner: 2 as const, score: 2750};
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [WinnerDialogComponent],
        providers: [
          {provide: MAT_DIALOG_DATA, useValue: data}
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(WinnerDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.data.winner).toBe(2);
      expect(component.data.score).toBe(2750);
    });
  });

  describe('Score variations', () => {
    it('should handle minimum score', async () => {
      const data = {winner: 1 as const, score: 2000};
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [WinnerDialogComponent],
        providers: [
          {provide: MAT_DIALOG_DATA, useValue: data}
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(WinnerDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.data.score).toBe(2000);
    });

    it('should handle large scores', async () => {
      const data = {winner: 2 as const, score: 10000};
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [WinnerDialogComponent],
        providers: [
          {provide: MAT_DIALOG_DATA, useValue: data}
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(WinnerDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.data.score).toBe(10000);
    });

    it('should handle various score values', async () => {
      const scores = [2000, 2500, 3000, 5000, 10000];
      for (const score of scores) {
        const data = {winner: 1 as const, score};
        await TestBed.resetTestingModule();
        await TestBed.configureTestingModule({
          imports: [WinnerDialogComponent],
          providers: [
            {provide: MAT_DIALOG_DATA, useValue: data}
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(WinnerDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.data.score).toBe(score);
      }
    });
  });

  describe('Data structure validation', () => {
    it('should have required properties in data', () => {
      expect('winner' in component.data).toBeTrue();
      expect('score' in component.data).toBeTrue();
    });

    it('should not have unexpected properties', () => {
      const dataKeys = Object.keys(component.data);
      expect(dataKeys).toContain('winner');
      expect(dataKeys).toContain('score');
      expect(dataKeys.length).toBe(2);
    });

    it('should have correct data types', () => {
      expect(typeof component.data.winner).toBe('number');
      expect(typeof component.data.score).toBe('number');
    });
  });

  describe('Integration tests', () => {
    it('should display winner information correctly', () => {
      const winnerNumber = component.data.winner;
      const winningScore = component.data.score;

      expect(winnerNumber).toBeGreaterThanOrEqual(1);
      expect(winnerNumber).toBeLessThanOrEqual(2);
      expect(winningScore).toBeGreaterThanOrEqual(0);
    });

    it('should handle complete dialog scenario', () => {
      // Component is created with dialog data
      expect(component).toBeTruthy();

      // Data is properly injected
      expect(component.data).toBeDefined();
      expect(component.data.winner).toBe(mockDialogData.winner);
      expect(component.data.score).toBe(mockDialogData.score);
    });
  });
});
