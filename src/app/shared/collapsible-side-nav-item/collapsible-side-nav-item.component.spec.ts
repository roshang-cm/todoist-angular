import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleSideNavItemComponent } from './collapsible-side-nav-item.component';

describe('CollapsibleSideNavItemComponent', () => {
  let component: CollapsibleSideNavItemComponent;
  let fixture: ComponentFixture<CollapsibleSideNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsibleSideNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleSideNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
