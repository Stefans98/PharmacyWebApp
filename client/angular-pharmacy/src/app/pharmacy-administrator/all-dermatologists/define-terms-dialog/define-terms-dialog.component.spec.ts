import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTermsDialogComponent } from './define-terms-dialog.component';

describe('DefineTermsDialogComponent', () => {
  let component: DefineTermsDialogComponent;
  let fixture: ComponentFixture<DefineTermsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineTermsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTermsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
