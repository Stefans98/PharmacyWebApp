import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistRegistrationComponent } from './dermatologist-registration.component';

describe('DermatologistRegistrationComponent', () => {
  let component: DermatologistRegistrationComponent;
  let fixture: ComponentFixture<DermatologistRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
