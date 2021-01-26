import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistWorkCalendarComponent } from './dermatologist-work-calendar.component';

describe('DermatologistWorkCalendarComponent', () => {
  let component: DermatologistWorkCalendarComponent;
  let fixture: ComponentFixture<DermatologistWorkCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistWorkCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistWorkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
