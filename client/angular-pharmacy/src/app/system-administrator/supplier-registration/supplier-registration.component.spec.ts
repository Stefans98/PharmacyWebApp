import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegistrationComponent } from './supplier-registration.component';

describe('SupplierRegistrationComponent', () => {
  let component: SupplierRegistrationComponent;
  let fixture: ComponentFixture<SupplierRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
