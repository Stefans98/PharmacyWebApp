import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAdministratorMyPharmacyComponent } from './pharmacy-administrator-my-pharmacy.component';

describe('PharmacyAdministratorMyPharmacyComponent', () => {
  let component: PharmacyAdministratorMyPharmacyComponent;
  let fixture: ComponentFixture<PharmacyAdministratorMyPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyAdministratorMyPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyAdministratorMyPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
