import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForMedicinesComponent } from './request-for-medicines.component';

describe('RequestForMedicinesComponent', () => {
  let component: RequestForMedicinesComponent;
  let fixture: ComponentFixture<RequestForMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestForMedicinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
