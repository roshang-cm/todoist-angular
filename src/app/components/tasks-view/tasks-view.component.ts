import { Component, OnInit, Input } from "@angular/core";
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
  taskFilter: (task: Task) => boolean = () => true;
  setAddTaskVisible(newSetting: boolean) {
    this.isAddTaskVisible = newSetting;
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
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
    private authService: AuthServiceService
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

  resolveContextByProject(route: ActivatedRouteSnapshot) {}

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
