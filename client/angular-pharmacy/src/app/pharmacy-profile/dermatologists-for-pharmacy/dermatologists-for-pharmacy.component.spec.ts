import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistsForPharmacyComponent } from './dermatologists-for-pharmacy.component';

describe('DermatologistsForPharmacyComponent', () => {
  let component: DermatologistsForPharmacyComponent;
  let fixture: ComponentFixture<DermatologistsForPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistsForPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistsForPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
