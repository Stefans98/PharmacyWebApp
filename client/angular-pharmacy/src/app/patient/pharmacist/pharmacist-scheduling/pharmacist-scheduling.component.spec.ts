import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistSchedulingComponent } from './pharmacist-scheduling.component';

describe('PharmacistSchedulingComponent', () => {
  let component: PharmacistSchedulingComponent;
  let fixture: ComponentFixture<PharmacistSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
