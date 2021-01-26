import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistNewAppointmentComponent } from './dermatologist-new-appointment.component';

describe('DermatologistNewAppointmentComponent', () => {
  let component: DermatologistNewAppointmentComponent;
  let fixture: ComponentFixture<DermatologistNewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistNewAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
