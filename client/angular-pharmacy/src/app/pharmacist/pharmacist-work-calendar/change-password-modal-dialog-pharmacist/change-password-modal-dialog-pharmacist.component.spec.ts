import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordModalDialogPharmacistComponent } from './change-password-modal-dialog-pharmacist.component';

describe('ChangePasswordModalDialogPharmacistComponent', () => {
  let component: ChangePasswordModalDialogPharmacistComponent;
  let fixture: ComponentFixture<ChangePasswordModalDialogPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordModalDialogPharmacistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordModalDialogPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
