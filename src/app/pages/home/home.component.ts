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

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isAddTaskVisible = false;

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
    task.checked = !task.checked;
    this.taskService.updateTask(task);
  }
  constructor(
    private taskService: TaskService,
    private toastService: ToastService,
    private httpService: TaskHttpService,
    private authService: AuthServiceService
  ) {}

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
      moveItemInArray(
        this.taskService.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
