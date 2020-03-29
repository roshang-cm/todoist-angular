import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-task-contextual-menu",
  templateUrl: "./task-contextual-menu.component.html",
  styleUrls: ["./task-contextual-menu.component.scss"]
})
export class TaskContextualMenuComponent implements OnInit {
  @Input() task: Task;
  constructor() {}

  ngOnInit(): void {}
}
