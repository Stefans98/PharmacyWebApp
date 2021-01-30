import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistNewAppointmentComponent } from './pharmacist-new-appointment.component';

describe('PharmacistNewAppointmentComponent', () => {
  let component: PharmacistNewAppointmentComponent;
  let fixture: ComponentFixture<PharmacistNewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistNewAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
