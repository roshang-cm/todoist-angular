import { Component, OnInit } from "@angular/core";
import { DialogOverlayRef, DialogContext } from "src/app/services/dialogref";
import { Task } from "src/app/models/task.model";
import * as moment from "moment";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DateService } from "src/app/services/date.service";
import { TaskService } from "src/app/services/task.service";
import { DialogService } from "src/app/services/dialog.service";
import { TimeMenuComponent } from "../time-menu/time-menu.component";
import { Time } from "@angular/common";

@Component({
  selector: "app-task-contextual-schedule-menu",
  templateUrl: "./task-contextual-schedule-menu.component.html",
  styleUrls: ["./task-contextual-schedule-menu.component.scss"],
})
export class TaskContextualScheduleMenuComponent implements OnInit {
  task: Task;
  selectedDate = null;
  shouldUpdate = true;
  constructor(
    private dialogRef: DialogOverlayRef,
    private dateService: DateService,
    private dialogService: DialogService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.task = Task.fromJson(this.dialogRef.data.contextData);
    if (this.task.dueDate) {
      this.selectedDate = this.task.dueDate;
    }
    if (this.dialogRef.data.otherData === "no-update") {
      this.shouldUpdate = false;
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
    if (this.shouldUpdate) {
      this.taskService.updateTask(this.task, false, "Due date removed");
    }
    this.dialogRef.close(null);
  }
  updateTaskDateByDate(date) {
    const newDate = moment(date);
    this.task.dueDate = newDate;
    if (this.shouldUpdate) {
      this.taskService.updateTask(this.task, false, "Due date updated");
    }
    this.dialogRef.close(this.task);
  }

  updateTaskByTime(time: Time | null) {
    let newDate = moment().startOf("day");
    if (this.task.dueDate) newDate = moment(this.task.dueDate);
    if (time) {
      this.task.withTime = true;
      newDate.set("hour", time.hours);
      newDate.set("minute", time.minutes);
    } else {
      this.task.withTime = false;
    }
    this.task.dueDate = newDate;
    if (this.shouldUpdate) {
      this.taskService.updateTask(this.task, false, "Time updated");
    }
    this.dialogRef.close(this.task);
  }

  showTimeMenuPopover(event: MouseEvent) {
    const contextData: DialogContext = {
      contextData: this.task,
      contextType: "task",
    };
    const timeDialogRef = this.dialogService.openPopover(
      event.target,
      TimeMenuComponent,
      contextData
    );
    timeDialogRef.afterClosed$.subscribe((data) => {
      console.log(data);
      if (data.type === "close") {
        const time = moment(data.data);

        this.updateTaskByTime({
          hours: time.hours(),
          minutes: time.minutes(),
        });
      }
    });
  }
}
