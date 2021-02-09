import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedMedicinesSearchComponent } from './non-authenticated-medicines-search.component';

describe('NonAuthenticatedMedicinesSearchComponent', () => {
  let component: NonAuthenticatedMedicinesSearchComponent;
  let fixture: ComponentFixture<NonAuthenticatedMedicinesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedMedicinesSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedMedicinesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
