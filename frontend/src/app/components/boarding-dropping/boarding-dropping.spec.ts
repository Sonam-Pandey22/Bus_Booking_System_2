import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingDropping } from './boarding-dropping';

describe('BoardingDropping', () => {
  let component: BoardingDropping;
  let fixture: ComponentFixture<BoardingDropping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingDropping],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardingDropping);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
