import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { v4 as uuid4 } from "uuid";
import { TaskHttpService } from "./task-http.service";

export interface SyncAction {
  id: number | string;
  task: Task;
  action: "ADD_TASK" | "UPDATE_TASK" | "DELETE_TASK" | "REORDER_TASK";
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
      action
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
    //Must apply all pending actions to backend
    this._syncActions.forEach(syncAction => {
      this.taskHttpService.executeSyncAction(
        syncAction,
        this.onSyncActionComplete
      );
    });
    //Then fetch the latest copy from server
    this.updateCache();
  }

  private readFromCache() {
    const data = JSON.parse(localStorage.getItem("cache"));
    let tasks = [];
    let syncActions = [];
    if (data) {
      tasks = data.tasks;
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
    this._tasks.push(task);
    this.addToSyncActions(task, "ADD_TASK");
    this.sync();
  }

  updateTask(task: Task) {
    let index = -1;
    this._tasks.forEach((taskInList, indexOfTask) => {
      if (taskInList.id === task.id) {
        index = indexOfTask;
      }
    });
    if (index === -1) {
      return;
    }
    this._tasks[index] = task;
    this.addToSyncActions(task, "UPDATE_TASK");
  }

  constructor(private taskHttpService: TaskHttpService) {
    const cachedData = this.readFromCache();
    this._tasks = cachedData.tasks;
    this._syncActions = cachedData.syncActions;
  }
}
