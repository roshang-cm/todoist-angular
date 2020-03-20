import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-icon-button",
  templateUrl: "./icon-button.component.html",
  styleUrls: ["./icon-button.component.scss"]
})
export class IconButtonComponent implements OnInit {
  @Input() color:
    | "default"
    | "info"
    | "error"
    | "primary"
    | "secondary"
    | "white" = "default";

  @Input() backgroundHighlight = false;

  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
