import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyModalDialogComponent } from './pharmacy-modal-dialog.component';

describe('PharmacyModalDialogComponent', () => {
  let component: PharmacyModalDialogComponent;
  let fixture: ComponentFixture<PharmacyModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
