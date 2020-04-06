import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeMenuComponent } from './time-menu.component';

describe('TimeMenuComponent', () => {
  let component: TimeMenuComponent;
  let fixture: ComponentFixture<TimeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
