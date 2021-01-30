import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAdministratorRegistrationComponent } from './pharmacy-administrator-registration.component';

describe('PharmacyAdministratorRegistrationComponent', () => {
  let component: PharmacyAdministratorRegistrationComponent;
  let fixture: ComponentFixture<PharmacyAdministratorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyAdministratorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyAdministratorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
