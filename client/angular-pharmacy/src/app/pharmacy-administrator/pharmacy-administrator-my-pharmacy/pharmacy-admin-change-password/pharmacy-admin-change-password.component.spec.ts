import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAdminChangePasswordComponent } from './pharmacy-admin-change-password.component';

describe('PharmacyAdminChangePasswordComponent', () => {
  let component: PharmacyAdminChangePasswordComponent;
  let fixture: ComponentFixture<PharmacyAdminChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyAdminChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyAdminChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
