import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinePromotionComponent } from './define-promotion.component';

describe('DefinePromotionComponent', () => {
  let component: DefinePromotionComponent;
  let fixture: ComponentFixture<DefinePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
