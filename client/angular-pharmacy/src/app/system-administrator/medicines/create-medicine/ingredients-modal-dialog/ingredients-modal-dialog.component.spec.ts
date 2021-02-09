import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsModalDialogComponent } from './ingredients-modal-dialog.component';

describe('IngredientsModalDialogComponent', () => {
  let component: IngredientsModalDialogComponent;
  let fixture: ComponentFixture<IngredientsModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
