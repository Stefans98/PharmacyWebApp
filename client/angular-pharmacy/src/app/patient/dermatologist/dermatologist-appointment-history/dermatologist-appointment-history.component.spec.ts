import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistAppointmentHistoryComponent } from './dermatologist-appointment-history.component';

describe('DermatologistAppointmentHistoryComponent', () => {
  let component: DermatologistAppointmentHistoryComponent;
  let fixture: ComponentFixture<DermatologistAppointmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistAppointmentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
