import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistAbsenceRequestComponent } from './pharmacist-absence-request.component';

describe('PharmacistAbsenceRequestComponent', () => {
  let component: PharmacistAbsenceRequestComponent;
  let fixture: ComponentFixture<PharmacistAbsenceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistAbsenceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistAbsenceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
