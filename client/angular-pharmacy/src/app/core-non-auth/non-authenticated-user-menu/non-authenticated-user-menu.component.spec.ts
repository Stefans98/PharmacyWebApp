import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedUserMenuComponent } from './non-authenticated-user-menu.component';

describe('NonAuthenticatedUserMenuComponent', () => {
  let component: NonAuthenticatedUserMenuComponent;
  let fixture: ComponentFixture<NonAuthenticatedUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedUserMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
