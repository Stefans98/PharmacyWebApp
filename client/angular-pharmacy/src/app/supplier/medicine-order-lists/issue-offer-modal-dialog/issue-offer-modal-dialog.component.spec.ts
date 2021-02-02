import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueOfferModalDialogComponent } from './issue-offer-modal-dialog.component';

describe('IssueOfferModalDialogComponent', () => {
  let component: IssueOfferModalDialogComponent;
  let fixture: ComponentFixture<IssueOfferModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueOfferModalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueOfferModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
