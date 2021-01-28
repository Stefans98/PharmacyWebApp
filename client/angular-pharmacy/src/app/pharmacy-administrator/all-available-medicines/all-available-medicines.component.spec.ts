import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAvailableMedicinesComponent } from './all-available-medicines.component';

describe('AllAvailableMedicinesComponent', () => {
  let component: AllAvailableMedicinesComponent;
  let fixture: ComponentFixture<AllAvailableMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAvailableMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAvailableMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
