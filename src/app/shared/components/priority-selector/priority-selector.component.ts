import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { DropdownService } from "src/app/services/dropdown.service";

@Component({
  selector: "app-priority-selector",
  templateUrl: "./priority-selector.component.html",
  styleUrls: ["./priority-selector.component.scss"]
})
export class PrioritySelectorComponent implements OnInit {
  @Input() task: Task;
  constructor(
    private taskService: TaskService,
    private dropdownService: DropdownService
  ) {}

  ngOnInit(): void {}

  setPriority(priority: number | null) {
    const updatedTask = Task.fromJson(this.task);
    updatedTask.priority = priority;
    this.taskService.updateTask(updatedTask);
    this.dropdownService.closeDropdown();
  }
}
