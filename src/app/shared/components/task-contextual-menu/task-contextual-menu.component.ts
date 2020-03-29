import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/task.model";
import { TaskService } from "src/app/services/task.service";
import { DateService } from "src/app/services/date.service";
import { DropdownService } from "src/app/services/dropdown.service";

@Component({
  selector: "app-task-contextual-menu",
  templateUrl: "./task-contextual-menu.component.html",
  styleUrls: ["./task-contextual-menu.component.scss"]
})
export class TaskContextualMenuComponent implements OnInit {
  @Input() task: Task;
  constructor(
    private taskService: TaskService,
    private dateService: DateService,
    private dropdownService: DropdownService
  ) {}

  onDateOptionClicked(option: "today" | "tomorrow" | "nw") {
    const updatedTask = Task.fromJson(this.task);
    switch (option) {
      case "today":
        updatedTask.dueDate = this.dateService.today;
        updatedTask.withTime = false;
        this.taskService.updateTask(updatedTask);
        break;
      case "tomorrow":
        this.task.dueDate = this.dateService.tomorrow;
        this.task.withTime = false;
        this.taskService.updateTask(this.task);
        break;
      case "nw":
        this.task.dueDate = this.dateService.nextWeek;
        this.task.withTime = false;
        this.taskService.updateTask(this.task);
        break;

      default:
        break;
    }
    this.dropdownService.closeDropdown();
  }

  ngOnInit(): void {}
}
