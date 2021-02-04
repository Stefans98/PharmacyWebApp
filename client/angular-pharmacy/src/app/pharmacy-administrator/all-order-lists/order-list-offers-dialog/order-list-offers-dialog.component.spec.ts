import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListOffersDialogComponent } from './order-list-offers-dialog.component';

describe('OrderListOffersDialogComponent', () => {
  let component: OrderListOffersDialogComponent;
  let fixture: ComponentFixture<OrderListOffersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListOffersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListOffersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
