import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesForPharmacyComponent } from './medicines-for-pharmacy.component';

describe('MedicinesForPharmacyComponent', () => {
  let component: MedicinesForPharmacyComponent;
  let fixture: ComponentFixture<MedicinesForPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinesForPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinesForPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
