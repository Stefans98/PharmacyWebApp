import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistForRequestComponent } from './pharmacist-for-request.component';

describe('PharmacistForRequestComponent', () => {
  let component: PharmacistForRequestComponent;
  let fixture: ComponentFixture<PharmacistForRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistForRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistForRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
