import { Component, OnInit, Input, ElementRef } from "@angular/core";
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";
import {
  ToastService,
  ToastAction,
  Toast,
  defaultUndoAction
} from "src/app/services/toast.service";
import { TaskHttpService } from "src/app/services/task-http.service";
import { AuthServiceService } from "src/app/services/auth-service.service";
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot
} from "@angular/router";
import * as moment from "moment";
import { Observable, combineLatest } from "rxjs";
import { NewProjectDialogComponent } from "src/app/shared/components/new-project-dialog/new-project-dialog.component";
import { DialogOverlayRef } from "src/app/services/dialogref";
import { DialogService } from "src/app/services/dialog.service";
import { ProjectService, Project } from "src/app/services/project.service";

export interface TaskListComponentType {
  type: "task" | "open_add_task" | "closed_add_task";
  task: Task;
}
@Component({
  selector: "app-tasks-view",
  templateUrl: "./tasks-view.component.html",
  styleUrls: ["./tasks-view.component.scss"]
})
export class TasksViewComponent implements OnInit {
  isAddTaskVisible = false;
  componentList = [];
  title = "";
  subtitle = "";
  activeProject: Project = null;
  taskFilter: (task: Task) => boolean = () => true;
  setAddTaskVisible(newSetting: boolean) {
    this.isAddTaskVisible = newSetting;
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
    this.dialogService.openDialog(NewProjectDialogComponent, null);
  }
  getTasks() {
    return this.taskService.tasks.filter(this.taskFilter);
  }

  onCheckChanged(task: Task) {
    //task.checked = !task.checked;
    const updatedTask = Task.fromJson(task);
    updatedTask.checked = !updatedTask.checked;
    this.taskService.updateTask(updatedTask);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastService: ToastService,
    private httpService: TaskHttpService,
    private authService: AuthServiceService,
    private dialogService: DialogService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(map => {
      const route = this.route.snapshot;
      switch (route.data.type) {
        case "inbox":
          this.title = "Inbox";
          this.taskFilter = (task: Task) => {
            return !task.project;
          };
          break;
        case "date":
          this.resolveContextByDate(route);
          break;
        case "project":
          this.resolveContextByProject(route);
          break;
      }
    });
  }
  showPopover(origin: MouseEvent) {
    this.dialogService.openPopover(
      origin.target,
      NewProjectDialogComponent,
      null,
      100
    );
  }
  resolveContextByDate(route: ActivatedRouteSnapshot) {
    const type = route.paramMap.get("type");
    switch (type) {
      case "today":
        this.title = "Today";
        this.taskFilter = (task: Task) => {
          if (!task.dueDate) return false;
          return task.dueDate.isSame(moment().startOf("day"), "day");
        };

        break;
      case "tomorrow":
        this.title = "Tomorrow";
        this.taskFilter = (task: Task) => {
          if (!task.dueDate) return false;
          return task.dueDate.isSame(
            moment()
              .startOf("day")
              .add(1, "day"),
            "day"
          );
        };

        break;
      case "nextweek":
        this.title = "Next Week";
        this.taskFilter = (task: Task) => {
          if (!task.dueDate) return false;
          return task.dueDate.isBetween(
            moment().startOf("day"),
            moment()
              .startOf("day")
              .add(8, "days"),
            "day"
          );
        };

        break;

      default:
        break;
    }
  }

  resolveContextByProject(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get("id");
    this.activeProject = this.projectService.getProjectById(id);
    if (!this.activeProject) {
      alert("This project does not exist");
      return;
    }
    this.taskFilter = task => {
      return task.project === this.activeProject.id;
    };
    this.title = this.activeProject.name;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(
        this.taskService.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
