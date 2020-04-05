import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "../../../models/task.model";
import { DateService } from "src/app/services/date.service";
import { ProjectService } from "src/app/services/project.service";
import { DialogService } from "src/app/services/dialog.service";
import { TaskContextualMenuComponent } from "../task-contextual-menu/task-contextual-menu.component";
import { DialogContext } from "src/app/services/dialogref";
import { TaskContextualScheduleMenuComponent } from "../task-contextual-schedule-menu/task-contextual-schedule-menu.component";
import { ProjectMenuComponent } from "../project-menu/project-menu.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-task-list-tile",
  templateUrl: "./task-list-tile.component.html",
  styleUrls: ["./task-list-tile.component.scss"],
})
export class TaskListTileComponent implements OnInit {
  @Input() task: Task;
  @Output() checkChanged = new EventEmitter();

  isDragEnter = false;

  taskProject = null;
  onCheckClicked() {
    this.checkChanged.emit(this.task);
  }
  showProjectPopover(origin: MouseEvent) {
    const context: DialogContext = {
      contextData: this.task,
      contextType: "task",
    };
    this.dialogService.openPopover(
      origin.target,
      ProjectMenuComponent,
      context
    );
  }

  gotoProject() {
    this.router.navigateByUrl(`/project/${this.task.project}`);
  }

  showSchedulingPopover(origin: MouseEvent) {
    const context: DialogContext = {
      contextData: this.task,
      contextType: "task",
    };
    this.dialogService.openPopover(
      origin.target,
      TaskContextualScheduleMenuComponent,
      context
    );
  }
  showTaskMenuPopover(origin: MouseEvent) {
    const context: DialogContext = {
      contextData: this.task,
      contextType: "task",
    };
    this.dialogService.openPopover(
      origin.target,
      TaskContextualMenuComponent,
      context
    );
  }

  onDragEnter() {
    this.isDragEnter = true;
  }

  get humanizedDate() {
    return this.dateService.human(this.task);
  }

  constructor(
    private dateService: DateService,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskProject = this.projectService.getProjectById(this.task.project);
  }
}
