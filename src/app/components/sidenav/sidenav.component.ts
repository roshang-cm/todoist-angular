import { Component, OnInit } from "@angular/core";
import { DialogService } from "src/app/services/dialog.service";
import { NewProjectDialogComponent } from "src/app/shared/components/new-project-dialog/new-project-dialog.component";
import { BlockScrollStrategy, Overlay } from "@angular/cdk/overlay";
import { Project, ProjectService } from "src/app/services/project.service";
import { Router } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { DateService } from "src/app/services/date.service";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  counts: any = {};
  projectAction = {
    tooltipText: "Add a new project",
    icon: "add",
    callback: () => {
      this.dialogService.openDialog(NewProjectDialogComponent, null, {
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });
    },
  };
  routeIncludes(query: string): boolean {
    return this.router.url.includes(query);
  }
  projectList: Project[];
  constructor(
    private projectService: ProjectService,
    private dialogService: DialogService,
    private overlay: Overlay,
    private router: Router,
    private taskService: TaskService,
    private dateService: DateService
  ) {
    this.projectList = this.projectService.projects;
    this.counts = {
      inbox: this.taskService.getCountByFilter((task) => {
        return task.project == null;
      }),
      today: this.taskService.getCountByFilter((task) => {
        if (!task.dueDate) return false;
        return task.dueDate.isSame(this.dateService.today, "day");
      }),
      tomorrow: this.taskService.getCountByFilter((task) => {
        if (!task.dueDate) return false;
        return task.dueDate.isSame(this.dateService.tomorrow, "day");
      }),
      nextWeek: this.taskService.getCountByFilter((task) => {
        if (!task.dueDate) return false;
        return task.dueDate.isSame(this.dateService.nextWeek, "day");
      }),
      byProject: (id: string) => {
        return this.taskService.getCountByFilter((task) => {
          return task.project === id;
        });
      },
    };
  }

  ngOnInit(): void {}
}
