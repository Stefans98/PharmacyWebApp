import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselingSchedulingComponent } from './counseling-scheduling.component';

describe('CounselingSchedulingComponent', () => {
  let component: CounselingSchedulingComponent;
  let fixture: ComponentFixture<CounselingSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounselingSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselingSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
