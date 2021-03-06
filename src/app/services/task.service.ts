import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { v4 as uuid4 } from "uuid";
import { TaskHttpService } from "./task-http.service";
import { ToastService, Toast } from "./toast.service";
import { Moment } from "moment";
import * as moment from "moment";
import { SyncAction, SyncActionsService } from "./sync-actions.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private _tasks: Task[] = [];

  get tasks(): Task[] {
    return this._tasks;
  }

  private addToSyncActions(
    task: SyncAction["task"],
    action: SyncAction["action"]
  ) {
    this._syncActions.append({
      id: uuid4(),
      task,
      action,
      time: moment(),
      type: "task",
    });
  }

  private updateCache() {
    const data = JSON.stringify({
      tasks: this._tasks,
    });
    localStorage.setItem("taskCache", data);
  }

  private sync() {
    // Must apply all pending actions to backend
    // this._syncActions.forEach(syncAction => {
    //   this.taskHttpService.executeSyncAction(
    //     syncAction,
    //     this.onSyncActionComplete
    //   );
    // });
    // Then fetch the latest copy from server
    this.updateCache();
  }

  private readFromCache() {
    const data = JSON.parse(localStorage.getItem("taskCache"));
    let tasks = [];
    let syncActions = [];
    if (data) {
      tasks = data.tasks;
      tasks = tasks.map((task) => {
        return Task.fromJson(task);
      });
    }
    return {
      tasks,
    };
  }

  addTask(task: Task) {
    task.id = uuid4();
    this._tasks.push(task);
    this.addToSyncActions(task, "ADD_TASK");
    this.sync();
    console.log("ADDED NEW TASK ==> ", task.id);
  }

  deleteTask(task: Task) {
    this._tasks = this._tasks.filter((taskInList: Task) => {
      return task.id !== taskInList.id;
    });
    this.toastService.show({
      message: "Task deleted",
    });
    this.addToSyncActions(task, "DELETE_TASK");
    this.sync();
  }

  updateTask(task: Task, noToast: boolean = false, whatChanged: string = null) {
    task = Task.fromJson(task);
    console.log("Update task was called!");
    let index = -1;
    this._tasks.forEach((taskInList, indexOfTask) => {
      if (taskInList.id === task.id) {
        index = indexOfTask;
      }
    });
    if (index === -1) {
      return;
    }

    const previousTask = Task.fromJson(this._tasks[index]);
    this._tasks[index] = task;
    this.addToSyncActions(task, "UPDATE_TASK");
    this.sync();
    console.log("PREVIOUSLY", previousTask, "TO", task);
    console.log("UPDATED TASK ==> ", task.id);
    if (noToast) {
      return;
    }
    this.toastService.show({
      previousTask,
      task,
      message: whatChanged ? whatChanged : "Task updated",
      actions: [
        {
          name: "Undo",
          type: "primary",
          callback: (toast: Toast) => {
            this.updateTask(toast.previousTask, true);
          },
        },
      ],
    });
  }

  getCountByFilter(filter: (task: Task) => boolean) {
    return this._tasks.filter(filter).length;
  }

  constructor(
    private taskHttpService: TaskHttpService,
    private toastService: ToastService,
    private _syncActions: SyncActionsService
  ) {
    const cachedData = this.readFromCache();
    this._tasks = cachedData.tasks;
  }
}
