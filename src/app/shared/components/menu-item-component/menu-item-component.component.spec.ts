import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponentComponent } from './menu-item-component.component';

describe('MenuItemComponentComponent', () => {
  let component: MenuItemComponentComponent;
  let fixture: ComponentFixture<MenuItemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
