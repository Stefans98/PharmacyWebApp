import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistsForPharmacyDialogComponent } from './dermatologists-for-pharmacy-dialog.component';

describe('DermatologistsForPharmacyDialogComponent', () => {
  let component: DermatologistsForPharmacyDialogComponent;
  let fixture: ComponentFixture<DermatologistsForPharmacyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistsForPharmacyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistsForPharmacyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
