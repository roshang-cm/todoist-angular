import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "../../../models/task.model";
import { DateService } from "src/app/services/date.service";

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
    this.checkChanged.emit(this.task);
  }

  onDragEnter() {
    this.isDragEnter = true;
  }

  get humanizedDate() {
    return this.dateService.human(this.task);
  }

  constructor(private dateService: DateService) {}

  ngOnInit(): void {}
}
