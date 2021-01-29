import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderListComponent } from './create-order-list.component';

describe('CreateOrderListComponent', () => {
  let component: CreateOrderListComponent;
  let fixture: ComponentFixture<CreateOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
