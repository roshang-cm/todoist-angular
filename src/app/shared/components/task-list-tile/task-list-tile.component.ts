import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "../../models/task.model";

@Component({
  selector: "app-task-list-tile",
  templateUrl: "./task-list-tile.component.html",
  styleUrls: ["./task-list-tile.component.scss"]
})
export class TaskListTileComponent implements OnInit {
  @Input() task: Task;
  @Output() checkChanged = new EventEmitter();

  isDragEnter = false;

  onCheckClicked() {
    this.task.checked = !this.task.checked;
    this.checkChanged.emit(this.task);
  }

  onDragEnter() {
    this.isDragEnter = true;
  }

  constructor() {}

  ngOnInit(): void {}
}
