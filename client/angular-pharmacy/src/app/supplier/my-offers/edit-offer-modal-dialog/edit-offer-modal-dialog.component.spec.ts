import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfferModalDialogComponent } from './edit-offer-modal-dialog.component';

describe('EditOfferModalDialogComponent', () => {
  let component: EditOfferModalDialogComponent;
  let fixture: ComponentFixture<EditOfferModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOfferModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOfferModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
