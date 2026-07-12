import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatistic } from './ticket-statistic';

describe('TicketStatistic', () => {
  let component: TicketStatistic;
  let fixture: ComponentFixture<TicketStatistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketStatistic],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketStatistic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
