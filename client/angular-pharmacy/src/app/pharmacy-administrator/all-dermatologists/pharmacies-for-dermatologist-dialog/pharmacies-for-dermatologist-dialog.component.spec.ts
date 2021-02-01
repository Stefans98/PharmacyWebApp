import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesForDermatologistDialogComponent } from './pharmacies-for-dermatologist-dialog.component';

describe('PharmaciesForDermatologistDialogComponent', () => {
  let component: PharmaciesForDermatologistDialogComponent;
  let fixture: ComponentFixture<PharmaciesForDermatologistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaciesForDermatologistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaciesForDermatologistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
