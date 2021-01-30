import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistMedicineIssueComponent } from './pharmacist-medicine-issue.component';

describe('PharmacistMedicineIssueComponent', () => {
  let component: PharmacistMedicineIssueComponent;
  let fixture: ComponentFixture<PharmacistMedicineIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistMedicineIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistMedicineIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
