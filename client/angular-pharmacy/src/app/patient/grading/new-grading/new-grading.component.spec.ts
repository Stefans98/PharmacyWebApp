import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGradingComponent } from './new-grading.component';

describe('NewGradingComponent', () => {
  let component: NewGradingComponent;
  let fixture: ComponentFixture<NewGradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
