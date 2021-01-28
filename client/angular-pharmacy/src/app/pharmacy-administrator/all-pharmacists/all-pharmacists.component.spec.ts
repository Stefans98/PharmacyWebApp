import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPharmacistsComponent } from './all-pharmacists.component';

describe('AllPharmacistsComponent', () => {
  let component: AllPharmacistsComponent;
  let fixture: ComponentFixture<AllPharmacistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPharmacistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPharmacistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
