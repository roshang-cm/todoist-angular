import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Task } from "../../models/task.model";

@Component({
  selector: "app-add-task-panel",
  templateUrl: "./add-task-panel.component.html",
  styleUrls: ["./add-task-panel.component.scss"]
})
export class AddTaskPanelComponent implements OnInit {
  task: Task = new Task();

  @Output() cancel = new EventEmitter();
  @Output() add = new EventEmitter();

  onCancelClicked() {
    this.cancel.emit();
  }

  onAddTaskClicked() {
    this.add.emit(this.task);
    this.task = new Task(); // Resetting the form
  }

  constructor() {}

  ngOnInit(): void {}
}
