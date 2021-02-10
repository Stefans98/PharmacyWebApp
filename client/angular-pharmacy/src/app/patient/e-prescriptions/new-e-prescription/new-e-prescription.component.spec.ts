import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEPrescriptionComponent } from './new-e-prescription.component';

describe('NewEPrescriptionComponent', () => {
  let component: NewEPrescriptionComponent;
  let fixture: ComponentFixture<NewEPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
