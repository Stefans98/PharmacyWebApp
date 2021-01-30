import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistStartAppointmentComponent } from './pharmacist-start-appointment.component';

describe('PharmacistStartAppointmentComponent', () => {
  let component: PharmacistStartAppointmentComponent;
  let fixture: ComponentFixture<PharmacistStartAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistStartAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistStartAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
