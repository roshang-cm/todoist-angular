import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "../../../models/task.model";
import { DateService } from "src/app/services/date.service";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: "app-task-list-tile",
  templateUrl: "./task-list-tile.component.html",
  styleUrls: ["./task-list-tile.component.scss"]
})
export class TaskListTileComponent implements OnInit {
  @Input() task: Task;
  @Output() checkChanged = new EventEmitter();

  isDragEnter = false;

  taskProject = null;
  onCheckClicked() {
    this.checkChanged.emit(this.task);
  }

  onDragEnter() {
    this.isDragEnter = true;
  }

  get humanizedDate() {
    return this.dateService.human(this.task);
  }

  constructor(
    private dateService: DateService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.taskProject = this.projectService.getProjectById(this.task.project);
  }
}
