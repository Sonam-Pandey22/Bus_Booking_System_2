import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSearch } from './bus-search';

describe('BusSearch', () => {
  let component: BusSearch;
  let fixture: ComponentFixture<BusSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(BusSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
