import { Component, OnInit } from "@angular/core";
import { DialogOverlayRef } from "src/app/services/dialogref";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-prioritymenu",
  templateUrl: "./prioritymenu.component.html",
  styleUrls: ["./prioritymenu.component.scss"],
})
export class PrioritymenuComponent implements OnInit {
  priority = 0;
  constructor(private dialogRef: DialogOverlayRef) {}

  ngOnInit(): void {
    const contextData = this.dialogRef.data.contextData;
    this.priority = contextData.priority;
  }

  onPriorityClicked(val: number) {
    this.dialogRef.close(val);
  }
}
