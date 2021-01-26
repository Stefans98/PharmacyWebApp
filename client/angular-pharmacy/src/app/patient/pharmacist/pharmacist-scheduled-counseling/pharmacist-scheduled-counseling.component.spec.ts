import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistScheduledCounselingComponent } from './pharmacist-scheduled-counseling.component';

describe('PharmacistScheduledCounselingComponent', () => {
  let component: PharmacistScheduledCounselingComponent;
  let fixture: ComponentFixture<PharmacistScheduledCounselingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistScheduledCounselingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistScheduledCounselingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
