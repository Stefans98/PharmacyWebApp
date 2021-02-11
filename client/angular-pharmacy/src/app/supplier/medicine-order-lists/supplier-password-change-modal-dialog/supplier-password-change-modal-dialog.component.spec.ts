import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPasswordChangeModalDialogComponent } from './supplier-password-change-modal-dialog.component';

describe('SupplierPasswordChangeModalDialogComponent', () => {
  let component: SupplierPasswordChangeModalDialogComponent;
  let fixture: ComponentFixture<SupplierPasswordChangeModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierPasswordChangeModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPasswordChangeModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
