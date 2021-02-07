import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesModalDialogComponent } from './allergies-modal-dialog.component';

describe('AllergiesModalDialogComponent', () => {
  let component: AllergiesModalDialogComponent;
  let fixture: ComponentFixture<AllergiesModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergiesModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergiesModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
