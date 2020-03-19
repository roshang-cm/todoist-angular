import { Component, OnInit, Input } from "@angular/core";
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import { Task } from "src/app/shared/models/task.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  mockTasks: Task[] = [];
  isAddTaskVisible = false;

  setAddTaskVisible(newSetting: boolean) {
    this.isAddTaskVisible = newSetting;
  }

  addTask(task: Task) {
    this.mockTasks.push(task);
  }

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(this.mockTasks, event.previousIndex, event.currentIndex);
    }
  }
}
