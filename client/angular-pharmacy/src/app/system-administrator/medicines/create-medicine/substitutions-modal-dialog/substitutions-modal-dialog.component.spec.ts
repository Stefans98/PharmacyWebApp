import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionsModalDialogComponent } from './substitutions-modal-dialog.component';

describe('SubstitutionsModalDialogComponent', () => {
  let component: SubstitutionsModalDialogComponent;
  let fixture: ComponentFixture<SubstitutionsModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstitutionsModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionsModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
