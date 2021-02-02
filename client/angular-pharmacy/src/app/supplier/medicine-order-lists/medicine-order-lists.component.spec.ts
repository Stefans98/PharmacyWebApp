import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineOrderListsComponent } from './medicine-order-lists.component';

describe('MedicineOrderListsComponent', () => {
  let component: MedicineOrderListsComponent;
  let fixture: ComponentFixture<MedicineOrderListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineOrderListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineOrderListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
