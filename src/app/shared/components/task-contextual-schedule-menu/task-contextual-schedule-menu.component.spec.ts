import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskContextualScheduleMenuComponent } from './task-contextual-schedule-menu.component';

describe('TaskContextualScheduleMenuComponent', () => {
  let component: TaskContextualScheduleMenuComponent;
  let fixture: ComponentFixture<TaskContextualScheduleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskContextualScheduleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskContextualScheduleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
