import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSpecificationModalDialogComponent } from './medicine-specification-modal-dialog.component';

describe('MedicineSpecificationModalDialogComponent', () => {
  let component: MedicineSpecificationModalDialogComponent;
  let fixture: ComponentFixture<MedicineSpecificationModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineSpecificationModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineSpecificationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
