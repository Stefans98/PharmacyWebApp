import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeGradeComponent } from './change-grade.component';

describe('ChangeGradeComponent', () => {
  let component: ChangeGradeComponent;
  let fixture: ComponentFixture<ChangeGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
