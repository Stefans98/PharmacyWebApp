import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeForRequestDialogComponent } from './employee-for-request-dialog.component';

describe('EmployeeForRequestDialogComponent', () => {
  let component: EmployeeForRequestDialogComponent;
  let fixture: ComponentFixture<EmployeeForRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeForRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeForRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
