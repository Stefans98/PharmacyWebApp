import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinePharmacyModalDialogComponent } from './medicine-pharmacy-modal-dialog.component';

describe('MedicinePharmacyModalDialogComponent', () => {
  let component: MedicinePharmacyModalDialogComponent;
  let fixture: ComponentFixture<MedicinePharmacyModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinePharmacyModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinePharmacyModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
