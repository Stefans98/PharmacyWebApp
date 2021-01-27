import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsModalDialogComponent } from './benefits-modal-dialog.component';

describe('BenefitsModalDialogComponent', () => {
  let component: BenefitsModalDialogComponent;
  let fixture: ComponentFixture<BenefitsModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
