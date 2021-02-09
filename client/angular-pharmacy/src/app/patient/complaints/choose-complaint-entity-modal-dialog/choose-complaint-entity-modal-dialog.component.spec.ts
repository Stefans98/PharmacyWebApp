import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseComplaintEntityModalDialogComponent } from './choose-complaint-entity-modal-dialog.component';

describe('ChooseComplaintEntityModalDialogComponent', () => {
  let component: ChooseComplaintEntityModalDialogComponent;
  let fixture: ComponentFixture<ChooseComplaintEntityModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseComplaintEntityModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseComplaintEntityModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
