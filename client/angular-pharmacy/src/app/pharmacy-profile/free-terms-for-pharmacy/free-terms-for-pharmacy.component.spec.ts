import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTermsForPharmacyComponent } from './free-terms-for-pharmacy.component';

describe('FreeTermsForPharmacyComponent', () => {
  let component: FreeTermsForPharmacyComponent;
  let fixture: ComponentFixture<FreeTermsForPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeTermsForPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTermsForPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
