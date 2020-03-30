import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { v4 as uuid4 } from "uuid";
import { TaskHttpService } from "./task-http.service";
import { ToastService, Toast } from "./toast.service";
import { Moment } from "moment";
import * as moment from "moment";

export interface SyncAction {
  id: number | string;
  task: Task;
  action: "ADD_TASK" | "UPDATE_TASK" | "DELETE_TASK" | "REORDER_TASK";
  time: moment.Moment | Date;
  type: "task" | "project" | "filter";
}

@Injectable({
  providedIn: "root"
})
export class TaskService {
  private _tasks: Task[] = [];
  private _syncActions: SyncAction[] = [];

  get tasks(): Task[] {
    return this._tasks;
  }

  private addToSyncActions(
    task: SyncAction["task"],
    action: SyncAction["action"]
  ) {
    this._syncActions.push({
      id: uuid4(),
      task,
      action,
      time: moment(),
      type: "task"
    });
  }

  private updateCache() {
    const data = JSON.stringify({
      tasks: this._tasks,
      syncActions: this._syncActions
    });
    localStorage.setItem("cache", data);
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
    const data = JSON.parse(localStorage.getItem("cache"));
    let tasks = [];
    let syncActions = [];
    if (data) {
      tasks = data.tasks;
      tasks = tasks.map(task => {
        return Task.fromJson(task);
      });
      syncActions = data.syncActions;
    }
    return {
      tasks,
      syncActions
    };
  }

  onSyncActionComplete(syncAction: SyncAction) {
    this._syncActions = this._syncActions.filter(sa => sa.id !== syncAction.id);
  }

  addTask(task: Task) {
    task.id = uuid4();
    this._tasks.push(task);
    this.addToSyncActions(task, "ADD_TASK");
    this.sync();
    console.log("ADDED NEW TASK ==> ", task.id);
  }

  updateTask(task: Task, noToast: boolean = false, whatChanged: string = null) {
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
          }
        }
      ]
    });
  }

  constructor(
    private taskHttpService: TaskHttpService,
    private toastService: ToastService
  ) {
    const cachedData = this.readFromCache();
    this._tasks = cachedData.tasks;
    this._syncActions = cachedData.syncActions;
  }
}
