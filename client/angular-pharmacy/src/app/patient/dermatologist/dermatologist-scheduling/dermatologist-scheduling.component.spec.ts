import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistSchedulingComponent } from './dermatologist-scheduling.component';

describe('DermatologistSchedulingComponent', () => {
  let component: DermatologistSchedulingComponent;
  let fixture: ComponentFixture<DermatologistSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
