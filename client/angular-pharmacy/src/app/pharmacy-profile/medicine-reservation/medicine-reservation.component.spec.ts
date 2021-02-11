import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineReservationComponent } from './medicine-reservation.component';

describe('MedicineReservationComponent', () => {
  let component: MedicineReservationComponent;
  let fixture: ComponentFixture<MedicineReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
