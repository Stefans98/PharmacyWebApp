import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMedicinesModalDialogPharmacistComponent } from './subscription-medicines-modal-dialog-pharmacist.component';

describe('SubscriptionMedicinesModalDialogPharmacistComponent', () => {
  let component: SubscriptionMedicinesModalDialogPharmacistComponent;
  let fixture: ComponentFixture<SubscriptionMedicinesModalDialogPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionMedicinesModalDialogPharmacistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMedicinesModalDialogPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
