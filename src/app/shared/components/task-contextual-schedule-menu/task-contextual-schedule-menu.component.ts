import { Component, OnInit } from "@angular/core";
import { DialogOverlayRef } from "src/app/services/dialogref";
import { Task } from "src/app/models/task.model";
import * as moment from "moment";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DateService } from "src/app/services/date.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-task-contextual-schedule-menu",
  templateUrl: "./task-contextual-schedule-menu.component.html",
  styleUrls: ["./task-contextual-schedule-menu.component.scss"],
})
export class TaskContextualScheduleMenuComponent implements OnInit {
  task: Task;
  selectedDate = null;
  constructor(
    private dialogRef: DialogOverlayRef,
    private dateService: DateService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.task = Task.fromJson(this.dialogRef.data.contextData);
    if (this.task.dueDate) {
      this.selectedDate = this.task.dueDate;
    }
  }

  onDateChanged(event: any) {
    this.selectedDate = event;
    this.updateTaskDateByDate(this.selectedDate);
  }

  onDateOptionClicked(type: string) {
    let date = null;
    switch (type) {
      case "today":
        date = this.dateService.today;
        break;
      case "tomorrow":
        date = this.dateService.tomorrow;
        break;
      case "nextweek":
        date = this.dateService.nextWeek;
        break;
      default:
        return;
    }
    this.updateTaskDateByDate(date);
  }

  updateTaskRemoveDueDate() {
    this.task.dueDate = null;
    this.task.withTime = false;
    this.taskService.updateTask(this.task, false, "Due date removed");
    this.dialogRef.close();
  }
  updateTaskDateByDate(date) {
    const newDate = moment(date);
    this.task.dueDate = newDate;
    this.taskService.updateTask(this.task, false, "Due date updated");
    this.dialogRef.close();
  }
}
