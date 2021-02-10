import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdmChangePasswordModalDialogComponent } from './sys-adm-change-password-modal-dialog.component';

describe('SysAdmChangePasswordModalDialogComponent', () => {
  let component: SysAdmChangePasswordModalDialogComponent;
  let fixture: ComponentFixture<SysAdmChangePasswordModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysAdmChangePasswordModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAdmChangePasswordModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
