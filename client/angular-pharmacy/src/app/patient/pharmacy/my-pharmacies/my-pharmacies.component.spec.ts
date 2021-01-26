import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPharmaciesComponent } from './my-pharmacies.component';

describe('MyPharmaciesComponent', () => {
  let component: MyPharmaciesComponent;
  let fixture: ComponentFixture<MyPharmaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPharmaciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
