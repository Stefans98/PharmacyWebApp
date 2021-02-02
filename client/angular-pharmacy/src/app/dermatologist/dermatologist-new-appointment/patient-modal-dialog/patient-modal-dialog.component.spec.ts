import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientModalDialogComponent } from './patient-modal-dialog.component';

describe('PatientModalDialogComponent', () => {
  let component: PatientModalDialogComponent;
  let fixture: ComponentFixture<PatientModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
