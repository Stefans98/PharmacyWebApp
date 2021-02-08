import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMedicinesComponent } from './all-medicines.component';

describe('AllMedicinesComponent', () => {
  let component: AllMedicinesComponent;
  let fixture: ComponentFixture<AllMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
