import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSpecificationModalDialogPharmacistComponent } from './medicine-specification-modal-dialog-pharmacist.component';

describe('MedicineSpecificationModalDialogPharmacistComponent', () => {
  let component: MedicineSpecificationModalDialogPharmacistComponent;
  let fixture: ComponentFixture<MedicineSpecificationModalDialogPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineSpecificationModalDialogPharmacistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineSpecificationModalDialogPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
