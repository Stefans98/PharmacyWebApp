import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedHomePageComponent } from './non-authenticated-home-page.component';

describe('NonAuthenticatedHomePageComponent', () => {
  let component: NonAuthenticatedHomePageComponent;
  let fixture: ComponentFixture<NonAuthenticatedHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
