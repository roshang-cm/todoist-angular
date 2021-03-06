import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Task } from "../../../models/task.model";
import { DialogService } from "src/app/services/dialog.service";
import { TaskContextualScheduleMenuComponent } from "../task-contextual-schedule-menu/task-contextual-schedule-menu.component";
import { DialogContext } from "src/app/services/dialogref";
import { DateService } from "src/app/services/date.service";
import { TaskContext } from "src/app/components/tasks-view/tasks-view.component";
import { ProjectService } from "src/app/services/project.service";
import { ProjectMenuComponent } from "../project-menu/project-menu.component";
import { PrioritymenuComponent } from "../prioritymenu/prioritymenu.component";

@Component({
  selector: "app-add-task-panel",
  templateUrl: "./add-task-panel.component.html",
  styleUrls: ["./add-task-panel.component.scss"],
})
export class AddTaskPanelComponent implements OnInit {
  task: Task = new Task();
  @Input() context: TaskContext = {};
  @Output() cancel = new EventEmitter();
  @Output() add = new EventEmitter();

  onCancelClicked() {
    this.cancel.emit();
  }

  get taskDueDateForDisplay() {
    return this.dateService.getReadableStrings(this.task.dueDate);
  }

  get taskProject() {
    return this.projectService.getProjectById(this.task.project);
  }
  onAddTaskClicked() {
    if (this.task.title.length === 0) {
      return;
    }
    this.add.emit(this.task);
    this.task = new Task(); // Resetting the form
  }

  onCtrlEnter(event: KeyboardEvent) {
    if (event.key === "Enter" && event.ctrlKey) {
      this.onAddTaskClicked();
    }
    console.log("Entere");
  }

  showSchedulePopover(event: MouseEvent) {
    const context: DialogContext = {
      contextData: this.task,
      contextType: "task",
      otherData: "no-update",
    };
    const ref = this.dialogService.openPopover(
      event.target,
      TaskContextualScheduleMenuComponent,
      context
    );
    ref.afterClosed$.subscribe((date) => {
      console.log(date);
      if (date.type === "close") {
        this.task.dueDate = date.data.dueDate;
        if (date.data.withTime) {
          this.task.withTime = true;
        }
      }
    });
  }

  showPriorityPopover(event: MouseEvent) {
    const context: DialogContext = {
      contextData: this.task,
      contextType: "task",
      otherData: "no-update",
    };
    const ref = this.dialogService.openPopover(
      event.target,
      PrioritymenuComponent,
      context
    );
    ref.afterClosed$.subscribe((data) => {
      if (data.type === "close") {
        this.task.priority = data.data;
      }
    });
  }
  showProjectPopover(event: MouseEvent) {
    const context: DialogContext = {
      contextData: this.task,
      contextType: "task",
      otherData: "no-update",
    };
    const ref = this.dialogService.openPopover(
      event.target,
      ProjectMenuComponent,
      context
    );
    ref.afterClosed$.subscribe((data) => {
      if (data.type === "close") {
        this.task.project = data.data;
      }
    });
  }
  constructor(
    private dialogService: DialogService,
    private dateService: DateService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.context.dueDate) {
      this.task.dueDate = this.context.dueDate;
    }
    if (this.context.project) {
      this.task.project = this.context.project;
    }
  }
}
