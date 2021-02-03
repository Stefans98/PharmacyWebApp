import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderListDialogComponent } from './update-order-list-dialog.component';

describe('UpdateOrderListDialogComponent', () => {
  let component: UpdateOrderListDialogComponent;
  let fixture: ComponentFixture<UpdateOrderListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
