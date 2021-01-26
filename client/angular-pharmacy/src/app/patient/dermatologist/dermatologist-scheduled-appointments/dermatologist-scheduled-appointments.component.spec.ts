import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistScheduledAppointmentsComponent } from './dermatologist-scheduled-appointments.component';

describe('DermatologistScheduledAppointmentsComponent', () => {
  let component: DermatologistScheduledAppointmentsComponent;
  let fixture: ComponentFixture<DermatologistScheduledAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistScheduledAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistScheduledAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
