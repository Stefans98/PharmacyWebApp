import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerComplaintModalDialogComponent } from './answer-complaint-modal-dialog.component';

describe('AnswerComplaintModalDialogComponent', () => {
  let component: AnswerComplaintModalDialogComponent;
  let fixture: ComponentFixture<AnswerComplaintModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerComplaintModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerComplaintModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
