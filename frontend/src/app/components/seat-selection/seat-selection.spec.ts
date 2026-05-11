import { ComponentFixture, TestBed } from '@angular/core/testing';
// CHANGE: SeatSelection ko SeatSelectionComponent kijiye
import { SeatSelectionComponent } from './seat-selection'; 

describe('SeatSelectionComponent', () => { // Naam badalna achha rehta hai
  let component: SeatSelectionComponent;
  let fixture: ComponentFixture<SeatSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // detectChanges use karein
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});