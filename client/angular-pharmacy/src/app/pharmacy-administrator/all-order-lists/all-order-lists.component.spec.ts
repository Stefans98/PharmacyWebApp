import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderListsComponent } from './all-order-lists.component';

describe('AllOrderListsComponent', () => {
  let component: AllOrderListsComponent;
  let fixture: ComponentFixture<AllOrderListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrderListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrderListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
