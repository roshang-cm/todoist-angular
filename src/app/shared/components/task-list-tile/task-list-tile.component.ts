import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-task-list-tile",
  templateUrl: "./task-list-tile.component.html",
  styleUrls: ["./task-list-tile.component.scss"]
})
export class TaskListTileComponent implements OnInit {
  @Input() title = "Undefined";

  constructor() {}

  ngOnInit(): void {}
}
