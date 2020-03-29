import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/models/task.model";

@Component({
  selector: "app-priority-selector",
  templateUrl: "./priority-selector.component.html",
  styleUrls: ["./priority-selector.component.scss"]
})
export class PrioritySelectorComponent implements OnInit {
  @Input() task: Task;
  constructor() {}

  ngOnInit(): void {}
}
