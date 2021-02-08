import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyChoosingComponent } from './pharmacy-choosing.component';

describe('PharmacyChoosingComponent', () => {
  let component: PharmacyChoosingComponent;
  let fixture: ComponentFixture<PharmacyChoosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyChoosingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
