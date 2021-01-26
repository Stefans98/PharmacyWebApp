import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistStartAppointmentComponent } from './dermatologist-start-appointment.component';

describe('DermatologistStartAppointmentComponent', () => {
  let component: DermatologistStartAppointmentComponent;
  let fixture: ComponentFixture<DermatologistStartAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistStartAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistStartAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
