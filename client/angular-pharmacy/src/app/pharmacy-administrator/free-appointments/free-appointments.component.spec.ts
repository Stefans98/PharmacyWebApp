import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAppointmentsComponent } from './free-appointments.component';

describe('FreeAppointmentsComponent', () => {
  let component: FreeAppointmentsComponent;
  let fixture: ComponentFixture<FreeAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
