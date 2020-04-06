import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { DateService } from "src/app/services/date.service";
import { DialogOverlayRef, DialogContext } from "src/app/services/dialogref";
import { DialogService } from "src/app/services/dialog.service";
import { TaskContextualScheduleMenuComponent } from "../task-contextual-schedule-menu/task-contextual-schedule-menu.component";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
  selector: "app-task-contextual-menu",
  templateUrl: "./task-contextual-menu.component.html",
  styleUrls: ["./task-contextual-menu.component.scss"],
})
export class TaskContextualMenuComponent implements OnInit {
  @Input() task: Task;

  sharedDialogRef: DialogOverlayRef;
  constructor(
    private taskService: TaskService,
    private dateService: DateService,
    private dialogRef: DialogOverlayRef,
    private dialogService: DialogService
  ) {}

  onDateOptionClicked(option: "today" | "tomorrow" | "nw") {
    const updatedTask = Task.fromJson(this.task);
    switch (option) {
      case "today":
        updatedTask.dueDate = this.dateService.today;
        updatedTask.withTime = false;
        break;
      case "tomorrow":
        updatedTask.dueDate = this.dateService.tomorrow;
        updatedTask.withTime = false;
        break;
      case "nw":
        updatedTask.dueDate = this.dateService.nextWeek;
        updatedTask.withTime = false;
        break;

      default:
        return;
    }
    this.taskService.updateTask(updatedTask, false, "Due date updated");
    this.dialogRef.close();
  }

  showSchedulingPopover(event: MouseEvent) {
    const content: DialogContext = {
      contextData: this.task,
      contextType: "task",
    };
    this.dialogService.openPopover(
      event.target,
      TaskContextualScheduleMenuComponent,
      content
    );
  }

  onDeleteClicked() {
    const ref = this.dialogService.openDialog(
      DeleteConfirmationDialogComponent,
      null
    );
    ref.afterClosed$.subscribe((result) => {
      if (result.type === "close") {
        if (result.data) {
          //User wants to delete
          this.taskService.deleteTask(this.task);
          this.dialogRef.close();
        }
      }
    });
  }

  ngOnInit(): void {
    this.task = this.dialogRef.data.contextData;
    console.log(this.task);
    this.sharedDialogRef = this.dialogRef;
  }
}
