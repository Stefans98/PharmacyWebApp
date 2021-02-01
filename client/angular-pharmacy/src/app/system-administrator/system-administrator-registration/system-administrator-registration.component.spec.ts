import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdministratorRegistrationComponent } from './system-administrator-registration.component';

describe('SystemAdministratorRegistrationComponent', () => {
  let component: SystemAdministratorRegistrationComponent;
  let fixture: ComponentFixture<SystemAdministratorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdministratorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAdministratorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
