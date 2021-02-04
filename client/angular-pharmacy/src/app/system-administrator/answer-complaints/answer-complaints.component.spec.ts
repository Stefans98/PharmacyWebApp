import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerComplaintsComponent } from './answer-complaints.component';

describe('AnswerComplaintsComponent', () => {
  let component: AnswerComplaintsComponent;
  let fixture: ComponentFixture<AnswerComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
