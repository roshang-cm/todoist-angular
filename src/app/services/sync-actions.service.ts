import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { Project } from "./project.service";
import * as moment from "moment";

export interface SyncAction {
  id: number | string;
  project?: Project;
  task?: Task;
  action:
    | "ADD_TASK"
    | "UPDATE_TASK"
    | "DELETE_TASK"
    | "REORDER_TASK"
    | "ADD_PROJECT"
    | "UPDATE_PROJECT"
    | "DELETE_PROJECT";
  time: moment.Moment | Date;
  type: "task" | "project";
}

@Injectable({
  providedIn: "root"
})
export class SyncActionsService {
  constructor() {}
  read(): SyncAction[] {
    const syncActionsFromStorage = localStorage.getItem("syncActions");
    if (syncActionsFromStorage) {
      return JSON.parse(syncActionsFromStorage);
    }
    return [];
  }
  commit(sa: SyncAction[]) {
    localStorage.setItem("syncActions", JSON.stringify(sa));
  }

  append(syncAction: SyncAction) {
    const sa = this.read();
    sa.push(syncAction);
    this.commit(sa);
  }
}
