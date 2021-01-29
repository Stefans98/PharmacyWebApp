import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistPatientsComponent } from './pharmacist-patients.component';

describe('PharmacistPatientsComponent', () => {
  let component: PharmacistPatientsComponent;
  let fixture: ComponentFixture<PharmacistPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
