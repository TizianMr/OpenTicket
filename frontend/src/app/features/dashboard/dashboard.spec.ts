import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise modalOpen as false', () => {
    expect(component.modalOpen()).toBe(false);
  });

  it('should set modalOpen to true when openModal is called', () => {
    component.openModal();
    expect(component.modalOpen()).toBe(true);
  });

  it('should set modalOpen to false when closeModal is called', () => {
    component.closeModal();
    expect(component.modalOpen()).toBe(false);
  });
});
