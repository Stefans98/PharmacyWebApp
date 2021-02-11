import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEPrescriptionsComponent } from './my-e-prescriptions.component';

describe('MyEPrescriptionsComponent', () => {
  let component: MyEPrescriptionsComponent;
  let fixture: ComponentFixture<MyEPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEPrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
