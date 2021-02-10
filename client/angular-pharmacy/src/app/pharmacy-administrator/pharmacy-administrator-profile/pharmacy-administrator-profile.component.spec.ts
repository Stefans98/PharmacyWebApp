import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAdministratorProfileComponent } from './pharmacy-administrator-profile.component';

describe('PharmacyAdministratorProfileComponent', () => {
  let component: PharmacyAdministratorProfileComponent;
  let fixture: ComponentFixture<PharmacyAdministratorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyAdministratorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyAdministratorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
