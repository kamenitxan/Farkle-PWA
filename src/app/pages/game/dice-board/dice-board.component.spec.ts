import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceBoardComponent } from './dice-board.component';

describe('DiceBoardComponent', () => {
  let component: DiceBoardComponent;
  let fixture: ComponentFixture<DiceBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
