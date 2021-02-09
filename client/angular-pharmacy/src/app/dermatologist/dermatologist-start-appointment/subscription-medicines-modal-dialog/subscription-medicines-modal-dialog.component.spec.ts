import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMedicinesModalDialogComponent } from './subscription-medicines-modal-dialog.component';

describe('SubscriptionMedicinesModalDialogComponent', () => {
  let component: SubscriptionMedicinesModalDialogComponent;
  let fixture: ComponentFixture<SubscriptionMedicinesModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionMedicinesModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMedicinesModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
