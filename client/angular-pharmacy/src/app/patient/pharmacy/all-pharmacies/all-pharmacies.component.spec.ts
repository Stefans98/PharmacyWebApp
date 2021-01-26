import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPharmaciesComponent } from './all-pharmacies.component';

describe('AllPharmaciesComponent', () => {
  let component: AllPharmaciesComponent;
  let fixture: ComponentFixture<AllPharmaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPharmaciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
