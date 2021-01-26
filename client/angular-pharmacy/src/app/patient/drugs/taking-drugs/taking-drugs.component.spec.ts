import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakingDrugsComponent } from './taking-drugs.component';

describe('TakingDrugsComponent', () => {
  let component: TakingDrugsComponent;
  let fixture: ComponentFixture<TakingDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakingDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakingDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
