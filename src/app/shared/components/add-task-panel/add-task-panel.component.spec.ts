import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskPanelComponent } from './add-task-panel.component';

describe('AddTaskPanelComponent', () => {
  let component: AddTaskPanelComponent;
  let fixture: ComponentFixture<AddTaskPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
