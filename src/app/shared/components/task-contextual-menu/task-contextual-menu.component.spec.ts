import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskContextualMenuComponent } from './task-contextual-menu.component';

describe('TaskContextualMenuComponent', () => {
  let component: TaskContextualMenuComponent;
  let fixture: ComponentFixture<TaskContextualMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskContextualMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskContextualMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
