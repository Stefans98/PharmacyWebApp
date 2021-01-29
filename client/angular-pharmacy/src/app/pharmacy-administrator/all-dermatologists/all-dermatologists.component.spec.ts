import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDermatologistsComponent } from './all-dermatologists.component';

describe('AllDermatologistsComponent', () => {
  let component: AllDermatologistsComponent;
  let fixture: ComponentFixture<AllDermatologistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDermatologistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDermatologistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
