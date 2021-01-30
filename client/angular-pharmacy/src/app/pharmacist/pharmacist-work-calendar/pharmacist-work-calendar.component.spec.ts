import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistWorkCalendarComponent } from './pharmacist-work-calendar.component';

describe('PharmacistWorkCalendarComponent', () => {
  let component: PharmacistWorkCalendarComponent;
  let fixture: ComponentFixture<PharmacistWorkCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistWorkCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistWorkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
