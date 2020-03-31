import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { v4 as uuid4 } from "uuid";
import { TaskHttpService } from "./task-http.service";
import { ToastService, Toast } from "./toast.service";
import { Moment } from "moment";
import * as moment from "moment";
import { SyncAction, SyncActionsService } from "./sync-actions.service";

export interface Project {
  id: string;
  name: string;
  color: string;
}
@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private syncActionService: SyncActionsService) {
    this._projects = this.readCache();
  }
  private _projects: Project[] = [];

  get projects(): Project[] {
    return this._projects;
  }

  private updateCache() {
    localStorage.setItem("projectCache", JSON.stringify(this.projects));
  }

  private readCache() {
    const projects = localStorage.getItem("projectCache");
    if (projects) {
      return JSON.parse(projects);
    }
    return [];
  }

  addProject(name: string, color: string) {
    const newProject = {
      color,
      name,
      id: uuid4()
    };
    this._projects.push(newProject);
    this.updateCache();
    this.addToSyncActions(newProject, "ADD_PROJECT");
  }

  private addToSyncActions(
    project: SyncAction["project"],
    action: SyncAction["action"]
  ) {
    this.syncActionService.append({
      id: uuid4(),
      project,
      action,
      time: moment(),
      type: "project"
    });
  }
}
