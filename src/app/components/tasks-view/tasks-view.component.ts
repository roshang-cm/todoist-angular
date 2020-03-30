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
import { ActivatedRoute, Router } from "@angular/router";

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
  setAddTaskVisible(newSetting: boolean) {
    this.isAddTaskVisible = newSetting;
  }

  addTask(task: Task) {
    this.taskService.addTask(task);
  }
  getTasks() {
    return this.taskService.tasks;
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
    this.route.data.forEach(data => {
      console.log(data);
      alert(data.type);
    });
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
