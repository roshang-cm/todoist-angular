import { Component, OnInit } from "@angular/core";
import { DialogService } from "src/app/services/dialog.service";
import { NewProjectDialogComponent } from "src/app/shared/components/new-project-dialog/new-project-dialog.component";
import { BlockScrollStrategy, Overlay } from "@angular/cdk/overlay";
import { Project, ProjectService } from "src/app/services/project.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  projectAction = {
    tooltipText: "Add a new project",
    icon: "add",
    callback: () => {
      this.dialogService.open(NewProjectDialogComponent, null, {
        scrollStrategy: this.overlay.scrollStrategies.block()
      });
    }
  };

  projectList: Project[];
  constructor(
    private projectService: ProjectService,
    private dialogService: DialogService,
    private overlay: Overlay
  ) {
    this.projectList = this.projectService.projects;
  }

  ngOnInit(): void {}
}
