import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordModalDialogComponent } from './change-password-modal-dialog.component';

describe('ChangePasswordModalDialogComponent', () => {
  let component: ChangePasswordModalDialogComponent;
  let fixture: ComponentFixture<ChangePasswordModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
