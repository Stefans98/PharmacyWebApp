import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGradeEntityModalDialogComponent } from './choose-grade-entity-modal-dialog.component';

describe('ChooseGradeEntityModalDialogComponent', () => {
  let component: ChooseGradeEntityModalDialogComponent;
  let fixture: ComponentFixture<ChooseGradeEntityModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseGradeEntityModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseGradeEntityModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
