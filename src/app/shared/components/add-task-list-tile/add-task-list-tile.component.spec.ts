import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskListTileComponent } from './add-task-list-tile.component';

describe('AddTaskListTileComponent', () => {
  let component: AddTaskListTileComponent;
  let fixture: ComponentFixture<AddTaskListTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskListTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskListTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
