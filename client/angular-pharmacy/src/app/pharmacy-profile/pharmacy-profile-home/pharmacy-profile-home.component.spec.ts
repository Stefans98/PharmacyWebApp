import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyProfileHomeComponent } from './pharmacy-profile-home.component';

describe('PharmacyProfileHomeComponent', () => {
  let component: PharmacyProfileHomeComponent;
  let fixture: ComponentFixture<PharmacyProfileHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyProfileHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyProfileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
