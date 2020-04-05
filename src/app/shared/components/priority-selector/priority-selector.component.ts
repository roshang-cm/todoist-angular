import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { DialogOverlayRef } from "src/app/services/dialogref";

@Component({
  selector: "app-priority-selector",
  templateUrl: "./priority-selector.component.html",
  styleUrls: ["./priority-selector.component.scss"]
})
export class PrioritySelectorComponent implements OnInit {
  @Input() task: Task;
  @Input() dialogRef: DialogOverlayRef;
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  setPriority(priority: number | null) {
    console.log("Setting priority to: ", this.task, this.dialogRef);
    const updatedTask = Task.fromJson(this.task);
    updatedTask.priority = priority;
    this.taskService.updateTask(updatedTask);
    this.dialogRef.close();
  }
}
