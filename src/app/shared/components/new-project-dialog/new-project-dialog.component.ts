import { Component, OnInit } from "@angular/core";
import { OverlayRef } from "@angular/cdk/overlay";
import { DialogOverlayRef } from "src/app/services/dialogref";
import { ProjectService } from "src/app/services/project.service";

@Component({
  selector: "app-new-project-dialog",
  templateUrl: "./new-project-dialog.component.html",
  styleUrls: ["./new-project-dialog.component.scss"],
})
export class NewProjectDialogComponent implements OnInit {
  colorOptions = [
    { color: "#E60000", name: "Red" },
    { color: "#4287f5", name: "Blue" },
    { color: "#42f56f", name: "Green" },
    { color: "#bfbfbf", name: "Grey" },
    { color: "#000000", name: "Black" },
    { color: "#f5a11b", name: "Orange" },
    { color: "#f5ee1b", name: "Yellow" },
    { color: "#ffcc00", name: "Gold" },
    { color: "#d000ff", name: "Violet" },
    { color: "#5700ba", name: "Indigo" },
    { color: "#e3e2c8", name: "Silver" },
  ];

  projectName = "";
  projectColor = this.colorOptions[0];
  constructor(
    private dialogRef: DialogOverlayRef,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const data = this.dialogRef.data;
    if (data.contextData) {
      this.projectName = data.contextData;
    }
  }

  onCloseClicked() {
    this.dialogRef.close();
  }

  onAddClicked() {
    console.log(this.projectName, this.projectColor.color);
    this.projectService.addProject(this.projectName, this.projectColor.color);
    this.dialogRef.close();
  }
}
