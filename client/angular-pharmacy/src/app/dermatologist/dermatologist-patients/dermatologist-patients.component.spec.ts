import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistPatientsComponent } from './dermatologist-patients.component';

describe('DermatologistPatientsComponent', () => {
  let component: DermatologistPatientsComponent;
  let fixture: ComponentFixture<DermatologistPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
