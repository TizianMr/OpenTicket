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
    fixture.componentRef.setInput('icon', 'circle-half');
    fixture.componentRef.setInput('title', 'Unit test');
    fixture.componentRef.setInput('number', 0);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
