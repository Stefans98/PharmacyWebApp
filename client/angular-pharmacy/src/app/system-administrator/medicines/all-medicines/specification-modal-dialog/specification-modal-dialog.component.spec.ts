import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationModalDialogComponent } from './specification-modal-dialog.component';

describe('SpecificationModalDialogComponent', () => {
  let component: SpecificationModalDialogComponent;
  let fixture: ComponentFixture<SpecificationModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
