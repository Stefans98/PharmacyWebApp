import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistsForPharmacyComponent } from './pharmacists-for-pharmacy.component';

describe('PharmacistsForPharmacyComponent', () => {
  let component: PharmacistsForPharmacyComponent;
  let fixture: ComponentFixture<PharmacistsForPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistsForPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistsForPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
