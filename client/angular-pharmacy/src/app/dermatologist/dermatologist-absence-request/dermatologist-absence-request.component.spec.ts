import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistAbsenceRequestComponent } from './dermatologist-absence-request.component';

describe('DermatologistAbsenceRequestComponent', () => {
  let component: DermatologistAbsenceRequestComponent;
  let fixture: ComponentFixture<DermatologistAbsenceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistAbsenceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistAbsenceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
