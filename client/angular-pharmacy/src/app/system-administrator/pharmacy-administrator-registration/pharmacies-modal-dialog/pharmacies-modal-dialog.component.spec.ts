import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesModalDialogComponent } from './pharmacies-modal-dialog.component';

describe('PharmaciesModalDialogComponent', () => {
  let component: PharmaciesModalDialogComponent;
  let fixture: ComponentFixture<PharmaciesModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaciesModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaciesModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
