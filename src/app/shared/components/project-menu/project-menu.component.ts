import { Component, OnInit } from "@angular/core";
import { DialogOverlayRef } from "src/app/services/dialogref";
import { TaskService } from "src/app/services/task.service";
import { ProjectService, Project } from "src/app/services/project.service";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-project-menu",
  templateUrl: "./project-menu.component.html",
  styleUrls: ["./project-menu.component.scss"],
})
export class ProjectMenuComponent implements OnInit {
  task: Task;
  project: Project;
  query: string = "";
  shouldUpdate = true;
  constructor(
    private dialogRef: DialogOverlayRef,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  get projectSearchResults(): Project[] {
    return this.projectService.search(this.query);
  }

  ngOnInit(): void {
    const task = this.dialogRef.data.contextData;
    if (this.dialogRef.data.otherData) {
      const otherData: string = this.dialogRef.data.otherData;
      if (otherData.includes("no-update")) this.shouldUpdate = false;
    }
    this.task = Task.fromJson(task);
    if (this.task.project) {
      this.project = this.projectService.getProjectById(this.task.project);
    } else {
      this.project = null;
    }
  }

  onProjectClicked(project: Project) {
    this.task.project = project.id;
    if (this.shouldUpdate) {
      this.taskService.updateTask(this.task, false, "Project assigned to task");
    }
    this.dialogRef.close(project.id);
  }
}
