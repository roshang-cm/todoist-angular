import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-side-nav-item",
  templateUrl: "./side-nav-item.component.html",
  styleUrls: ["./side-nav-item.component.scss"]
})
export class SideNavItemComponent implements OnInit {
  constructor() {}
  @Input() icon: string;
  @Input() dot: boolean = false;
  @Input() dotColor: string = "#000";
  @Input() iconColor:
    | "default"
    | "info"
    | "error"
    | "primary"
    | "secondary"
    | "white" = "default";
  @Input() disabled = false;
  @Input() title: string;
  @Input() count: string;
  @Input() selected = false;

  ngOnInit(): void {
    if (this.selected !== false) {
      this.selected = true;
    }
  }
}
