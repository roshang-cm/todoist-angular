import { Component, OnInit } from "@angular/core";
import { Time } from "@angular/common";
import { DialogOverlayRef } from "src/app/services/dialogref";
import * as moment from "moment";

@Component({
  selector: "app-time-menu",
  templateUrl: "./time-menu.component.html",
  styleUrls: ["./time-menu.component.scss"],
})
export class TimeMenuComponent implements OnInit {
  inputTime: Time;
  constructor(private dialogRef: DialogOverlayRef) {}

  ngOnInit(): void {
    if (this.dialogRef.data) {
      console.log(this.dialogRef.data);
      const task = this.dialogRef.data.contextData;
      const taskDate = moment(task.dueDate);
      if (task.withTime) {
        this.inputTime = task.dueDate.format("HH:mm");
      }
    }
  }

  onSetTimeClicked() {
    const time = moment(this.inputTime, "HH:mm");
    if (this.inputTime) {
      this.dialogRef.close(time);
      return;
    } else {
      this.dialogRef.close(null);
    }
  }

  onCancelClicked() {
    this.dialogRef.close(null);
  }
}
